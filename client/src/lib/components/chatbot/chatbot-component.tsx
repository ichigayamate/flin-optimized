import { backend, BackendResponse } from "@/lib/scripts/backend";
import { AxiosResponse } from "axios";
import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: "Hello! How can I assist you today?" },
  ]);

  const [loading, setLoading] = useState(false);
  const addMessage = async (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, role: "user", content: message },
    ]);

    await backend.post("/chat", {
      message: message}
    ).then((response: AxiosResponse<BackendResponse<string>>) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          role: "assistant",
          content: response.data.data ?? "Sorry, I couldn't process your request.",
        },
      ]);
    }).catch((error) => {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          role: "assistant",
          content: "Sorry, I couldn't process your request.",
        },
      ]);
    }).finally(() => {
      setLoading(false);
    });
  }

  const handleChatClick = (message: string) => {

    addMessage(message);
  }

  return (
    <div>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat ${
            message.role === "assistant" ? "chat-start" : "chat-end"
          }`}
        >
          <div className="chat-bubble">{message.content}</div>
        </div>
      ))}
      {loading && (
        <div className="chat chat-start">
          <div className="chat-bubble">
            <span className="loading loading-dots loading-md"></span>
          </div>
        </div>
      )}
      <div className={`mt-4 ${loading ? "hidden" : ""} flex flex-wrap gap-2`}>
        <button className="btn btn-secondary btn-sm">What is FLIN</button>
        <button className="btn btn-secondary btn-sm" onClick={() => handleChatClick("Products")}>Ask about products</button>
        <button className="btn btn-secondary btn-sm">Ask requirements</button>
        <button className="btn btn-secondary btn-sm">Ask process</button>
        <button className="btn btn-secondary btn-sm">How to apply</button>
      </div>
      <input className="px-2 py-1 w-full border border-neutral-300 mt-4" disabled={loading} />
    </div>
  );
}
