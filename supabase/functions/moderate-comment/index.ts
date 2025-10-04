import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.7.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Toksisite eşiği: LABEL_1 (toksik) puanı bu değerin üzerindeyse yorum toksik kabul edilir.
const TOXICITY_THRESHOLD = 0.5; 

// Açıkça yasaklı kelimeler listesi
const BANNED_WORDS = new Set([
  "nigger", "fuck", "shit", "cunt", "asshole", "bitch", "bastard", "motherfucker",
  "faggot", "retard", "idiot", "moron", "kancık", "orospu", "piç", "siktir", "amcık",
  "göt", "pezevenk", "yarak", "taşak", "sikik", "ibne", "eşcinsel", "top", "puşt",
  "kahpe", "döl", "bok", "salak", "aptal", "gerizekalı", "beyinsiz", "mal", "lan", "amk", "aq"
]);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { commentId, content } = await req.json();

    const huggingfaceApiKey = Deno.env.get("HUGGINGFACE_API_KEY");
    if (!huggingfaceApiKey) {
      console.error("HUGGINGFACE_API_KEY is not set in Supabase secrets.");
      return new Response(JSON.stringify({ error: "Server configuration error: Hugging Face API key is missing." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // 1. Açık anahtar kelime kontrolü
    const lowerCaseContent = content.toLowerCase();
    let containsBannedWord = false;
    for (const word of BANNED_WORDS) {
      if (lowerCaseContent.includes(word)) {
        containsBannedWord = true;
        break;
      }
    }

    if (containsBannedWord) {
      await supabaseAdmin
        .from("comments")
        .update({ is_moderated: false })
        .eq("id", commentId);

      return new Response(JSON.stringify({
        message: "Comment flagged by explicit keyword filter. It will not be publicly visible.",
        is_moderated: false,
        toxicity_score: 1.0, // Yasaklı kelime içerdiği için en yüksek toksisite puanı
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // 2. Hugging Face toksisite denetimi (eğer yasaklı kelime bulunmazsa)
    const hf = new HfInference(huggingfaceApiKey);
    // Yeni çok dilli modeli kullanıyoruz
    const moderationResponse = await hf.textClassification({
      model: 'oliverguhr/bert-base-multilingual-cased-finetuned-toxic-comment-classification',
      inputs: content,
    });

    let toxicScore = 0;
    // Bu modelin çıktısı biraz farklı olabilir, genellikle 'toxic' veya benzeri bir etiket ararız.
    // Modelin çıktısını kontrol edip en yüksek toksisite puanını alalım.
    const toxicLabel = moderationResponse.find(item => item.label === 'toxic'); // 'toxic' etiketini arıyoruz
    if (toxicLabel) {
      toxicScore = toxicLabel.score;
    } else {
      // Eğer 'toxic' etiketi yoksa, diğer olumsuz etiketleri de kontrol edebiliriz
      // veya varsayılan olarak en yüksek puanı alabiliriz.
      // Şimdilik, en yüksek puanı alalım ve eşikle karşılaştıralım.
      const highestScoreLabel = moderationResponse.reduce((prev, current) => (prev.score > current.score) ? prev : current);
      if (highestScoreLabel.label !== 'not toxic') { // 'not toxic' değilse
        toxicScore = highestScoreLabel.score;
      }
    }

    const isToxic = toxicScore > TOXICITY_THRESHOLD;

    if (isToxic) {
      await supabaseAdmin
        .from("comments")
        .update({ is_moderated: false })
        .eq("id", commentId);

      return new Response(JSON.stringify({
        message: "Comment flagged by AI moderation. It will not be publicly visible.",
        is_moderated: false,
        toxicity_score: toxicScore,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      await supabaseAdmin
        .from("comments")
        .update({ is_moderated: true })
        .eq("id", commentId);

      return new Response(JSON.stringify({
        message: "Comment passed moderation and is now visible.",
        is_moderated: true,
        toxicity_score: toxicScore,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error moderating comment with Hugging Face:", error);
    return new Response(JSON.stringify({ error: error.message || "An unknown error occurred in the moderation function." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});