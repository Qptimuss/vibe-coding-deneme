import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.7.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Toksisite eşiği: Bu değerin üzerindeki puanlar toksik kabul edilir.
const TOXICITY_THRESHOLD = 0.5; 

// Helper to create a regex pattern that allows for character repetitions
// e.g., "porno" -> "p+o+r+n+o+"
function createSpammyRegex(word: string): string {
  return word.split('').map(char => `${char}+`).join('');
}

// Tam kelime olarak eşleşmesi gereken yasaklı kelimeler (regex ile \b kullanılarak)
// Lütfen buraya kendi uygulamanız için uygun yasaklı kelimeleri ekleyin.
const WHOLE_WORD_BANNED = new Set([
  // Örnek: "badword1", "badword2"
]);

// Alt dize olarak eşleşmesi gereken yasaklı kelimeler (includes kullanılarak)
// Lütfen buraya kendi uygulamanız için uygun yasaklı kelimeleri ekleyin.
const SUBSTRING_BANNED = new Set([
  // Örnek: "badsubstring1", "badsubstring2"
]);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { commentId, content } = await req.json();
    console.log("Received comment for moderation:", { commentId, content });

    const huggingfaceApiKey = Deno.env.get("HUGGINGFACE_API_KEY");
    if (!huggingfaceApiKey) {
      console.error("HUGGINGFACE_API_KEY is not set in Supabase secrets.");
      return new Response(JSON.stringify({ error: "Server configuration error: Hugging Face API key is missing." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    console.log("Hugging Face API key is present.");

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // 1. Açık anahtar kelime kontrolü (harf tekrarlarını dikkate alarak)
    const lowerCaseContent = content.toLowerCase();
    let containsBannedWord = false;

    // Tam kelime eşleşmesi kontrolü
    for (const word of WHOLE_WORD_BANNED) {
      const spammyWordRegex = new RegExp(`\\b${createSpammyRegex(word)}\\b`, 'i'); 
      if (spammyWordRegex.test(lowerCaseContent)) {
        containsBannedWord = true;
        console.log(`Comment flagged by WHOLE_WORD_BANNED (spammy regex): '${word}' in '${content}'`);
        break;
      }
    }

    // Eğer henüz işaretlenmediyse, alt dize eşleşmesi kontrolü
    if (!containsBannedWord) {
      for (const word of SUBSTRING_BANNED) {
        const spammySubstringRegex = new RegExp(createSpammyRegex(word), 'i');
        if (spammySubstringRegex.test(lowerCaseContent)) {
          containsBannedWord = true;
          console.log(`Comment flagged by SUBSTRING_BANNED (spammy regex): '${word}' in '${content}'`);
          break;
        }
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
    let englishToxicScore = 0;
    let turkishToxicScore = 0;

    // İngilizce toksisite modeli
    try {
      const englishModerationResponse = await hf.textClassification({
        model: 'unitary/toxic-bert', 
        inputs: content,
      });
      console.log("English model raw response:", englishModerationResponse);
      const englishToxicLabel = englishModerationResponse.find(item => item.label.toLowerCase().includes('toxic') || item.label === 'LABEL_1');
      if (englishToxicLabel) {
        englishToxicScore = englishToxicLabel.score;
        console.log(`English model found 'toxic' label with score: ${englishToxicScore}`);
      } else {
        console.log("English model did not find an explicit 'toxic' label.");
      }
    } catch (hfError: any) {
      console.error("Error calling English Hugging Face API:", hfError.message || hfError);
      // Hata durumunda puanı 0 olarak bırak, diğer modelin sonucunu etkilemesin
    }

    // Türkçe toksisite modeli
    try {
      const turkishModerationResponse = await hf.textClassification({
        model: 'savasy/bert-base-turkish-cased-toxic-detection', 
        inputs: content,
      });
      console.log("Turkish model raw response:", turkishModerationResponse);
      const turkishToxicLabel = turkishModerationResponse.find(item => item.label.toLowerCase() === 'toxic');
      if (turkishToxicLabel) {
        turkishToxicScore = turkishToxicLabel.score;
        console.log(`Turkish model found 'toxic' label with score: ${turkishToxicScore}`);
      } else {
        console.log("Turkish model did not find an explicit 'toxic' label.");
      }
    } catch (hfError: any) {
      console.error("Error calling Turkish Hugging Face API:", hfError.message || hfError);
      // Hata durumunda puanı 0 olarak bırak, diğer modelin sonucunu etkilemesin
    }

    // İki modelden gelen en yüksek toksisite puanını al
    const combinedToxicScore = Math.max(englishToxicScore, turkishToxicScore);
    const isToxic = combinedToxicScore > TOXICITY_THRESHOLD;
    console.log(`Final Scores - English: ${englishToxicScore}, Turkish: ${turkishToxicScore}, Combined: ${combinedToxicScore}, Threshold: ${TOXICITY_THRESHOLD}, Is toxic: ${isToxic}`);

    if (isToxic) {
      console.log("Comment flagged by AI moderation.");
      await supabaseAdmin
        .from("comments")
        .update({ is_moderated: false })
        .eq("id", commentId);

      return new Response(JSON.stringify({
        message: "Comment flagged by AI moderation. It will not be publicly visible.",
        is_moderated: false,
        toxicity_score: combinedToxicScore,
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
        toxicity_score: combinedToxicScore,
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