import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const selectChat = async () => {
  const { data, error } = await supabase
    .from("chat")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error(error);
  }
  return data || [];
};

export const insertChat = async (username: string, message: string) => {
  const { data, error } = await supabase
    .from("chat")
    .insert([
      {
        username,
        message,
      },
    ])
    .select("*");
  if (error) {
    console.error(error);
  }
  return data;
};
