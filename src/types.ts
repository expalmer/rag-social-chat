export type ChatMessage = {
  id: number;
  username: string;
  message: string;
  created_at: string;
  type: "response" | "request";
};
