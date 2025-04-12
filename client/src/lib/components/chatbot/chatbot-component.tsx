import { backend, BackendResponse } from "@/lib/scripts/backend";
import { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: "Hello! How can I assist you today?" },
  ]);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const chatRef = useRef<HTMLDivElement>(null);

  const addMessage = async (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, role: "user", content: message },
    ]);

    await backend
      .post("/chat", {
        message: message,
      })
      .then((response: AxiosResponse<BackendResponse<string>>) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            role: "assistant",
            content:
              response.data.data ?? "Sorry, I couldn't process your request.",
          },
        ]);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            role: "assistant",
            content: "Sorry, I couldn't process your request.",
          },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChatClick = (message: string) => {
    if (loading) return;
    if (message.trim() === "") return;
    addMessage(message);
    setInput("");
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
    });
  }, [messages]);

  return (
    <div>
      <div className="h-96 overflow-y-auto" ref={chatRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat ${
              message.role === "assistant" ? "chat-start" : "chat-end"
            }`}
          >
            <div className="chat-bubble text-sm">
              {message.content.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat chat-start">
            <div className="chat-bubble text-sm">
              <span className="loading loading-dots loading-md font-sm"></span>
            </div>
          </div>
        )}
      </div>
      <div className={`mt-4 ${loading ? "hidden" : ""} flex flex-wrap gap-2`}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleChatClick("What is FLIN?")}
        >
          What is FLIN
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleChatClick("Products")}
        >
          Ask about products
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleChatClick("Requirements")}
        >
          Ask requirements
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleChatClick("Process")}
        >
          Ask process
        </button>
      </div>
      <form
        className="flex items-center mt-4 gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="w-full">
          <input
            className="px-2 py-1 w-full border border-neutral-300"
            disabled={loading}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary btn-circle"
          onClick={() => handleChatClick(input)}
        >
          <span className="sr-only">Send</span>
          <IoSend />
        </button>
      </form>
    </div>
  );
}
