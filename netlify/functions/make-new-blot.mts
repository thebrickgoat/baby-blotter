import type { Context, Config } from "@netlify/functions";
import supabase from "../../utils/supabase/client";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-pro";
const API_KEY : any = process.env.PALM_API_KEY;


export default async (req: Request, context: Context) => {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {
      text: 'write a realistic police blotter entry, make it a little snarky but still matter of fact, and keep it in one paragraph and objective\n Officers responded to a call about a disturbance at a local grocery store, where a customer was reportedly causing a scene. Upon arrival, officers found a man dressed as a giant chicken attempting to purchase a rotisserie chicken. The man was asked to leave the store, but he refused, claiming to be a "chicken rights activist." As the man continued to cause a commotion, officers used a feather duster to gently coax him out of the store. The man was issued a citation for disorderly conduct and advised to seek professional help.',
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  const text = response.text();

  await supabase.auth.signInWithPassword({
    email: process.env.NETLIFY_FUNCTION_EMAIL!,
    password: process.env.NETLIFY_FUNCTION_PASSWORD!,
  });

  const { error } = await supabase.from("blotters").insert([{ text: text }]);
  if (error?.message != null) {
    console.log(error);
    await supabase.auth.signOut();
    return new Response("Error", { status: 500 });
  } else {
    await supabase.auth.signOut();
    return new Response(`Pushed to DB: ${text}!`, { status: 200});
  }
};
