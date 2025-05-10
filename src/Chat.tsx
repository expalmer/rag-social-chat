import { useEffect, useRef } from "react";
import { useMessages } from "./hooks";
import { getOnlyHours } from "./utils";

export function Chat({ username }: { username: string }) {
  const { messages, addNewMessage } = useMessages();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    if (ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-12">
      <h1 className="text-4xl">{username}</h1>
      <div className="max-w-md w-full mt-8 bg-gray-50 shadow-md rounded-lg">
        <div className="p-4 h-80 overflow-y-auto flex flex-col gap-3 text-sm">
          {messages.map((message) => {
            if (message.type === "request") {
              return (
                <div className="mb-2" key={message.id}>
                  <div className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                    <p>{message.message}</p>
                    <div className="text-xs text-gray-400 flex justify-end">
                      {getOnlyHours(message.created_at)}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div className="mb-2 text-right" key={message.id}>
                <div className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                  <div className="flex flex-col items-end">
                    <small className="text-xs">{message.username}</small>
                    <p>{message.message}</p>
                    <i className="text-xs text-blue-200">
                      {getOnlyHours(message.created_at)}
                    </i>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={ref} />
        </div>

        <div className="p-4 border-t border-gray-300 bg-gray-100">
          <textarea
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addNewMessage(e.currentTarget.value);
                e.currentTarget.value = "";
                scrollToBottom();
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }
            }}
            placeholder="Type your message here..."
            name="chat"
            id="chat"
            rows={2}
            className="w-full h-14 p-2 border text-inherit bg-white border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
