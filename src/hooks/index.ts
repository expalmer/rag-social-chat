import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { getUsername } from "../utils";
import type { ChatMessage } from "../types";
import { getBannedUsers, insertChat, selectChat } from "../service";

export const useMessages = () => {
  const username = getUsername();

  const { isBanned } = useBannedUser();
  console.log({ isBanned });

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
    isBanned,
  };
};

export const useBannedUser = () => {
  const username = getUsername();
  const { data, refetch } = useQuery({
    queryKey: ["banned_user"],
    queryFn: async () => {
      if (!username) {
        return [];
      }
      const data = await getBannedUsers(username);
      return data;
    },
    staleTime: 0,
    refetchInterval: 2000,
  });
  const isBanned = useMemo(() => {
    return data && data.length > 0;
  }, [data]);

  return {
    isBanned,
    refetch,
  };
};
