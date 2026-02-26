"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";

const SamiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", content: "Merhaba! Ben Sami'nin yapay zeka asistanıyım. Onun projeleri, eğitimi veya yetkinlikleri hakkında bana her şeyi sorabilirsin." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
        const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            messages: [...messages, userMsg] 
        }),
        });

        const data = await response.json();
        setMessages(prev => [...prev, { role: "ai", content: data.content }]);
    } catch (error) {
        setMessages(prev => [...prev, { role: "ai", content: "Üzgünüm, bir hata oluştu." }]);
    } finally {
        setIsTyping(false);
    }
    };

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="w-[350px] h-[500px] bg-black-100/80 backdrop-blur-xl border border-white/[0.1] rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 bg-purple/20 border-b border-white/[0.1] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple flex items-center justify-center">
                  <FaRobot className="text-white text-sm" />
                </div>
                <span className="text-white font-medium">Sami AI Asistan</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === "user" ? "bg-purple text-white rounded-tr-none" : "bg-white/10 text-gray-200 rounded-tl-none border border-white/5"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-xs text-purple animate-pulse">Sami AI düşünüyor...</div>}
              <div ref={scrollRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/[0.1] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Bir soru sor..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple"
              />
              <button type="submit" className="bg-purple p-2 rounded-xl text-white hover:bg-purple/80 transition-colors">
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-purple rounded-full shadow-lg flex items-center justify-center text-white text-2xl border border-white/20"
      >
        <FaRobot />
      </motion.button>
    </div>
  );
};

export default SamiChat;