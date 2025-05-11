import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const myChannel = supabase.channel("test-channel");
/**
 * Sending a message before subscribing will use HTTP
 */

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

  if (error || !data) {
    console.error(error);
  }
  myChannel
    .send({
      type: "broadcast",
      event: "sync-document",
      payload: { message: JSON.stringify(data?.[0]) },
    })
    .then((resp) => console.log(resp));

  return data;
};

export const getBannedUsers = async (username: string) => {
  const { data, error } = await supabase
    .from("banned_users")
    .select("*")
    .ilike("username", username.replace(/@/g, ""))
    .limit(1);
  if (error) {
    console.error(error);
  }
  return data;
};
