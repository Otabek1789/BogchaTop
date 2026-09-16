import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MessageSquare, X, Send, Bot, User, Loader, Sparkles } from 'lucide-react';
import { useKindergartens } from '../context/KindergartenContext';
import './AIChatbot.css';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Salom! Men Bog'chaTop sun'iy intellektiman. Sizga qanday yordam bera olaman?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const { data: kindergartens } = useKindergartens();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API kaliti topilmadi. Iltimos proyektning .env fayliga VITE_GEMINI_API_KEY qoshing.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

      // Create context string from kindergarten data
      const kgContext = kindergartens.map(kg => 
        `ID: ${kg.id}, Nomi: ${kg.name}, Tuman: ${kg.district}, Narxi: ${kg.price}, Reyting: ${kg.rating}, Tavsif: ${kg.description}`
      ).join('\n');

      const systemInstruction = `Siz Bog'chaTop loyihasining rasmiy sun'iy intellektisiz. 
Siz ota-onalarga O'zbekistondagi (xususan Toshkentdagi) eng yaxshi bog'chalarni topishda yordam berasiz.
Agar foydalanuvchi umuman boshqa mavzuda (masalan dasturlash kodlari, fizika, rasm haqida) so'rasa, xuddi haqiqiy Gemini kabi mukammal javob bering, kod yozib bering.
Lekin agar bog'chalar haqida so'rasa, quyidagi bazamizdagi bog'chalarni inobatga oling:
--- BOG'CHALAR BAZASI ---
${kgContext}
---
Javoblaringiz aniq, samimiy va chiroyli (emojilar bilan) bo'lsin. Markdowndan foydalaning.`;

      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: systemInstruction }] },
          { role: 'model', parts: [{ text: "Tushundim. Men Bog'chaTop sun'iy intellektiman." }] },
          ...messages.filter(m => m.text !== "Salom! Men Bog'chaTop sun'iy intellektiman. Sizga qanday yordam bera olaman?").map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          }))
        ],
      });

      const result = await chat.sendMessage(userMessage);
      const responseText = result.response.text();
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `Kechirasiz, xatolik yuz berdi: ${error.message}` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`ai-chatbot-container ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="ai-chatbot-toggle" onClick={() => setIsOpen(true)}>
          <Sparkles size={24} className="sparkle-icon" />
          <MessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div className="ai-chatbot-window">
          <div className="ai-chatbot-header">
            <div className="ai-chatbot-title">
              <Bot size={20} />
              <span>Bog'chaTop AI</span>
            </div>
            <button className="ai-chatbot-close" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="ai-chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`ai-message ${msg.role}`}>
                <div className="ai-message-icon">
                  {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="ai-message-content">
                  <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
                </div>
              </div>
            ))}
            {loading && (
              <div className="ai-message model">
                <div className="ai-message-icon"><Bot size={16} /></div>
                <div className="ai-message-content loading-content">
                  <Loader className="spin" size={16} /> O'ylamoqda...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-chatbot-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Yunusoboddagi ingliz tili bog'chalari..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={!input.trim() || loading}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
