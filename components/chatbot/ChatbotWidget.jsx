'use client';
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send } from "lucide-react";
import axios from "axios";

const presetSymptoms = [
  "Fever", "Cough", "Chest Pain", "Headache",
  "Skin Rash", "Stomach Pain", "Breathing Issue", "Anxiety"
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "👋 Hi! I'm your CareMate Assistant. Tell me your symptoms and I’ll suggest the right specialist." }
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("/api/chatbot", { message: text });
      const botMsg = { role: "bot", text: res.data.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: "⚠️ Sorry, I’m having trouble connecting to the AI right now." }]);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-xl border border-emerald-300 flex flex-col animate-fade-in">
          <div className="bg-emerald-600 text-white p-3 rounded-t-xl font-semibold text-center">
            CareMate AI Assistant 🤖
          </div>

          <div ref={chatRef} className="flex-1 p-3 overflow-y-auto space-y-2 max-h-80 bg-emerald-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "bg-emerald-100 text-emerald-900 ml-auto max-w-[80%]"
                    : "bg-white border border-emerald-300 text-gray-800 mr-auto max-w-[90%]"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="px-3 pb-2 flex flex-wrap gap-1">
            {presetSymptoms.map((sym, i) => (
              <button
                key={i}
                onClick={() => sendMessage(sym)}
                className="text-xs border border-emerald-600 text-emerald-700 rounded-full px-2 py-1 hover:bg-emerald-600 hover:text-white transition"
              >
                {sym}
              </button>
            ))}
          </div>

          <div className="flex border-t border-emerald-300 p-2 gap-2">
            <input
              type="text"
              placeholder="Describe symptoms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              className="flex-1 border border-emerald-500 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => sendMessage(input)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-md"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
