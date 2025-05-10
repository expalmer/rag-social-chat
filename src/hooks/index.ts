import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { getUsername } from "../utils";
import type { ChatMessage } from "../types";
import { insertChat, selectChat } from "../service";

export const useMessages = () => {
  const username = getUsername();
  const { data, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const data = await selectChat();
      const messages: ChatMessage[] = data.map((item) => {
        return {
          id: item.id,
          username: item.username,
          message: item.message,
          created_at: item.created_at,
          type: item.username === username ? "request" : "response",
        };
      });

      return messages;
    },
    staleTime: 0,
    refetchInterval: 4000,
  });

  const addNewMessage = useCallback(
    async (message: string) => {
      if (!username) {
        return;
      }
      await insertChat(username, message);
      refetch();
    },
    [username, refetch]
  );

  const messages = useMemo(() => {
    return data || [];
  }, [data]);

  return {
    addNewMessage,
    messages,
  };
};
