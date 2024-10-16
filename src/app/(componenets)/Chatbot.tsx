"use client";
import { useEffect, useState } from "react";
import { MessageCircle, Mic, X, Send } from "lucide-react";
import Image from "next/image";

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [input, setInput] = useState("");

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const chatWindow = document.getElementById("chat-window");
      if (chatWindow && !chatWindow.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 bg-emerald-700 text-white p-3 rounded-full shadow-lg hover:bg-emerald-800 transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isChatOpen && (
        <div
          id="chat-window"
          className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
        >
          <div className="flex justify-between items-center bg-emerald-700 text-white p-4">
            <div className="flex items-center">
              <Image
                src="/placeholder.svg?height=40&width=40&text=J"
                alt="Jarvis"
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <h3 className="font-semibold">Chat with Jarvis</h3>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3/4 p-2 rounded-lg ${
                    message.isUser
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center p-4 border-t border-gray-200"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-700 text-white px-4 py-2 rounded-r-md  hover:bg-emerald-800 transition-colors"
            >
              <Send size={20} />
            </button>
            <button
              type="button"
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className={`ml-2 p-2 rounded-full ${
                isVoiceEnabled
                  ? "bg-emerald-700 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <Mic size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
