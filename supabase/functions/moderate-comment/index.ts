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
    console.log("Received comment for moderation:", { commentId, content }); // Girişi logla

    const huggingfaceApiKey = Deno.env.get("HUGGINGFACE_API_KEY");
    if (!huggingfaceApiKey) {
      console.error("HUGGINGFACE_API_KEY is not set in Supabase secrets.");
      return new Response(JSON.stringify({ error: "Server configuration error: Hugging Face API key is missing." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    console.log("Hugging Face API key is present."); // API anahtarının varlığını onayla

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
      console.log("Comment flagged by explicit keyword filter.");
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
    let moderationResponse;
    try {
      moderationResponse = await hf.textClassification({
        model: 'oliverguhr/bert-base-multilingual-cased-finetuned-toxic-comment-classification',
        inputs: content,
      });
      console.log("Hugging Face moderation response:", moderationResponse); // HF yanıtını logla
    } catch (hfError: any) {
      console.error("Error calling Hugging Face API:", hfError.message || hfError);
      // Hugging Face API çağrısı başarısız olursa yorumu denetlenmemiş olarak işaretle
      await supabaseAdmin
        .from("comments")
        .update({ is_moderated: false }) 
        .eq("id", commentId);
      return new Response(JSON.stringify({
        error: "Hugging Face API call failed.",
        details: hfError.message || "Unknown error from Hugging Face API.",
        is_moderated: false,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    let toxicScore = 0;
    const toxicLabel = moderationResponse.find(item => item.label === 'toxic');
    if (toxicLabel) {
      toxicScore = toxicLabel.score;
      console.log("Found 'toxic' label with score:", toxicScore);
    } else {
      // Eğer 'toxic' etiketi açıkça bulunamazsa, varsayılan olarak toksik olmadığını varsayalım.
      // Bu model için 'toxic' veya 'not toxic' etiketleri beklenir.
      // Eğer 'toxic' yoksa, muhtemelen 'not toxic'tir veya beklenmedik bir çıktı vardır.
      console.warn("Explicit 'toxic' label not found in Hugging Face response. Assuming non-toxic.");
      toxicScore = 0; // 'toxic' etiketi bulunamazsa 0 olarak ayarla
    }

    const isToxic = toxicScore > TOXICITY_THRESHOLD;
    console.log(`Toxicity score: ${toxicScore}, Threshold: ${TOXICITY_THRESHOLD}, Is toxic: ${isToxic}`);

    if (isToxic) {
      console.log("Comment flagged by AI moderation.");
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
      console.log("Comment passed moderation.");
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
  } catch (error: any) {
    console.error("Unhandled error in moderate-comment function:", error.message || error);
    return new Response(JSON.stringify({ error: error.message || "An unknown error occurred in the moderation function." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});