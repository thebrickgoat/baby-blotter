import type { Context, Config } from "@netlify/functions";
import supabase from "../../utils/supabase/client";

export default async (req: Request, context: Context) => {
  let text = "test!";

  await supabase.auth.signInWithPassword({
    email: process.env.NETLIFY_FUNCTION_EMAIL!,
    password: process.env.NETLIFY_FUNCTION_PASSWORD!,
  });

  const { error } = await supabase.from("blotters").insert([{ text: text }]);
  if (error?.message != null) {
    console.log(error);
    return new Response("Error", { status: 500 });
  } else {
    return new Response("Pushed , world!");
  }
};
