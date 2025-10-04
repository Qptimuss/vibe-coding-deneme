import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.7.0'; // Hugging Face Inference client'ı eklendi

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Toksisite eşiği: LABEL_1 (toksik) puanı bu değerin üzerindeyse yorum toksik kabul edilir.
const TOXICITY_THRESHOLD = 0.7; 

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

    const hf = new HfInference(huggingfaceApiKey);

    // Hugging Face'in toxic-bert modelini kullanarak metni sınıflandır
    const moderationResponse = await hf.textClassification({
      model: 'unitary/toxic-bert', // Toksisite denetimi için popüler bir model
      inputs: content,
    });

    let toxicScore = 0;
    const toxicLabel = moderationResponse.find(item => item.label === 'LABEL_1'); // LABEL_1 genellikle toksik anlamına gelir
    if (toxicLabel) {
      toxicScore = toxicLabel.score;
    }

    const isToxic = toxicScore > TOXICITY_THRESHOLD; // Toksisite eşiğine göre karar ver

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    if (isToxic) {
      await supabaseAdmin
        .from("comments")
        .update({ is_moderated: false })
        .eq("id", commentId);

      return new Response(JSON.stringify({
        message: "Comment flagged by moderation. It will not be publicly visible.",
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