"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import axios from "axios";
import { api } from "@/lib/api";

const AiConsultant = () => {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! I am your AI Architect. How can I help with your project today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Ensure the URL matches your Backend Route
      const res = await api.post("/api/v1/ai/consult", {
        message: userMessage.content,
        history: messages 
      });

      if (res.data.success) {
        setMessages((prev) => [...prev, { role: "bot", content: res.data.reply }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "bot", content: "Connection interrupted. Ensure your server is running on port 5000." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[600px] flex flex-col rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
        <Bot size={20} className="text-indigo-400" />
        <h2 className="text-sm font-bold text-white uppercase tracking-widest">Architect AI</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
              msg.role === "user" ? "bg-indigo-600 text-white" : "bg-white/5 text-gray-300 border border-white/10"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <Loader2 className="animate-spin text-indigo-500" size={20} />}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleChat} className="p-4 bg-black/50 border-t border-white/5 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-indigo-500"
        />
        <button type="submit" className="p-3 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AiConsultant;