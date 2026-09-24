import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, X, Send, Sparkles, Gamepad2, Laptop, Zap, ShoppingBag, ExternalLink, Cpu, Tag, ArrowRight } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { initialProducts } from '../data/gamingData';
import { useCart } from '../context/CartContext';
import { useGamer } from '../context/GamerContext';
import { useLanguage } from '../context/LanguageContext';
import { soundFX } from '../utils/soundFX';
import './AIChatbot.css';

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
let genAI = null;
if (geminiApiKey) {
  try {
    genAI = new GoogleGenerativeAI(geminiApiKey);
  } catch (err) {
    console.warn("Gemini AI init error:", err);
  }
}

export default function AIChatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_ai_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return [
      {
        id: 1,
        sender: 'bot',
        text: "Salom geymer! Men Nexus Cyber AI — sun'iy intellektli kiber-maslahatchisiman. 🎮⚡\n\nQaysi o'yin uchun qanday uskuna kerak, eng kuchli gaming noutbuklar, monitorlar yoki o'zingizga mos PC konfiguratsiya yig'ish bo'yicha yordam berishim mumkin! Istalgan savolingizni bering."
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_ai_chat_history', JSON.stringify(messages));
    } catch (_) {}
  }, [messages]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const { addToCart } = useCart();
  const { addXP, unlockBadge } = useGamer();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    t('chatbot.quickPrompt1'),
    t('chatbot.quickPrompt2'),
    t('chatbot.quickPrompt3'),
    t('chatbot.quickPrompt4'),
    t('chatbot.quickPrompt5'),
    t('chatbot.quickPrompt6')
  ];

  // Helper: Faqat foydalanuvchi aynan shu toifa tovarlarini so'ragandagina tavsiya qilish
  const getRelevantProducts = (query) => {
    const q = query.toLowerCase();
    if (q.includes('noutbuk') || q.includes('laptop') || q.includes('scar') || q.includes('rog') || q.includes('nout')) {
      return [initialProducts.find(p => p.id === 'prod-2')].filter(Boolean);
    }
    if (q.includes('konsol') || q.includes('ps5') || q.includes('playstation') || q.includes('xbox') || q.includes('switch')) {
      return [
        initialProducts.find(p => p.id === 'prod-1'),
        initialProducts.find(p => p.id === 'prod-5')
      ].filter(Boolean);
    }
    if (q.includes('sichqoncha') || q.includes('mouse') || q.includes('klaviatura')) {
      return [
        initialProducts.find(p => p.id === 'prod-3'),
        initialProducts.find(p => p.id === 'prod-4')
      ].filter(Boolean);
    }
    if (q.includes('monitor') || q.includes('ekran') || q.includes('oled')) {
      return [initialProducts.find(p => p.id === 'prod-6')].filter(Boolean);
    }
    if (q.includes('quloqchin') || q.includes('headset') || q.includes('naushnik') || q.includes('audio')) {
      return [initialProducts.find(p => p.id === 'prod-8')].filter(Boolean);
    }
    if (q.includes('wukong') || q.includes('cyberpunk') || q.includes('o\'yin kaliti') || q.includes('oyin sotib')) {
      return [
        initialProducts.find(p => p.id === 'prod-7'),
        initialProducts.find(p => p.id === 'prod-9')
      ].filter(Boolean);
    }
    // Oddiy suhbat yoki boshqa savollarda HECH QANDAY tovar ko'rsatilmaydi!
    return [];
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    soundFX.playClick(1400);

    // Gamification reward for using AI
    addXP(50, "Cyber AI maslahati");
    unlockBadge('ai_explorer');

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const q = text.toLowerCase();
    let actionLink = null;
    if (q.includes('pc') || q.includes('kompyuter') || q.includes('yig\'ish') || q.includes('yigish') || q.includes('konfigurator') || q.includes('builder')) {
      actionLink = { label: "🖥️ PC Konfiguratorga O'tish", url: "/builder" };
    } else if (q.includes('chegirma') || q.includes('aksiya') || q.includes('promokod') || q.includes('promo')) {
      actionLink = { label: "🎯 Rush Mid O'yinini O'ynash", url: "/game" };
    }

    const recommendedProducts = getRelevantProducts(text);

    let botReply = '';

    // 1. Agar Gemini AI mavjud bo'lsa, haqiqiy AI bilan javob qaytarish
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash',
          systemInstruction: `Siz "Nexus Gaming" do'konining aqlli kiber-maslahatchisisiz (Nexus Cyber AI).
Geymerlar bilan o'zbek tilida, do'stona, samimiy va professional geymer uslubida gaplashing (FPS, ping, harorat, konfiguratsiyalar bo'yicha tushunchangiz bor).
Foydalanuvchining har qanday savoliga (o'yinlar, uskunalar, maslahatlar, salom-alik) lo'nda, qiziqarli va aniq javob bering (1-3 ta ixcham jumla).
Agar tovarlar haqida so'ralmasa, mahsulotlarni majburlab reklama qilmang.`
        });

        const chatResult = await model.generateContent(text);
        botReply = chatResult.response.text();
      } catch (err) {
        console.warn("Gemini API call failed, switching to local rule-based engine:", err);
      }
    }

    // 2. Agar Gemini ishlamasa yoki javob bo'sh kelsa, mahalliy mantiqiy javob berish
    if (!botReply) {
      if (q.includes('salom') || q.includes('assalom') || q.includes('qalesan') || q.includes('qandaysan') || q.includes('qalaysiz')) {
        botReply = "Va alaykum assalom, do'stim! Kayfiyatlar a'lomi? Bugun qanday o'yin yoki uskunalar bo'yicha suhbatlashamiz? 🎮";
      } else if (q.includes('noutbuk') || q.includes('laptop') || q.includes('scar') || q.includes('rog')) {
        botReply = "🔥 Hozirgi eng qudratli flagman gaming noutbuk: **ASUS ROG Strix SCAR 18 (2025)**! Unda Intel Core i9-14900HX va 175W to'liq quvvatdagi NVIDIA RTX 4090 16GB o'rnatilgan.";
      } else if (q.includes('konsol') || q.includes('ps5') || q.includes('playstation') || q.includes('xbox')) {
        botReply = "🎮 Konsollar bo'yicha eng zo'r tanlov: **PlayStation 5 Pro 2TB** hamda **Xbox Series X 1TB**. Har ikkalasi 4K 120FPS va rasmiy kafolatga ega!";
      } else if (q.includes('sichqoncha') || q.includes('mouse') || q.includes('cs2') || q.includes('valorant')) {
        botReply = "⚡ Professional kiber-sport musobaqalari uchun: **Razer Viper V3 Pro** (54g, 8000Hz) va **Logitech G PRO X 60** ajoyib natija beradi!";
      } else if (q.includes('pc') || q.includes('kompyuter') || q.includes('yig\'ish') || q.includes('builder')) {
        botReply = "🖥️ O'zingiz istagan parametrlarda kompyuter yig'ish uchun bizning yangi **Interaktiv PC Konfiguratorimiz**ga kiring! U yerda detallar mosligi va jonli FPS ko'rsatiladi.";
      } else if (q.includes('chegirma') || q.includes('aksiya') || q.includes('promokod')) {
        botReply = "🎉 Do'konimizda aksiyalar faol! **Rush Mid CS2 Arena** o'yinini yutib 15% chegirma kodini oling yoki savatda **CYBER10** kodini ishlating.";
      } else {
        botReply = "Savolingizni tushundim! Gaming texnikalari, PC konfiguratsiyalari yoki o'yinlar haqida istalgan savolingiz bo'lsa, bemalol so'rang, yordam berishga tayyorman!";
      }
    }

    soundFX.playClick(800);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'bot',
        text: botReply,
        products: recommendedProducts,
        actionLink
      }
    ]);
    setIsTyping(false);
  };

  const handleOpenChat = () => {
    soundFX.playClick();
    setIsOpen(true);
  };

  const handleCloseChat = () => {
    soundFX.playClick();
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button 
          className="ai-chat-trigger pulse-glow"
          onClick={handleOpenChat}
          title="Cyber AI Maslahatchi"
          aria-label="AI Maslahatchi"
        >
          <Bot size={24} color="#00f0ff" />
          <span className="trigger-badge">AI 24/7</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window glass">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-header-info">
              <div className="ai-avatar">
                <Bot size={20} color="#000" />
              </div>
              <div>
                <h3 className="ai-name">{t('chatbot.title')}</h3>
                <span className="ai-status">
                  <span className="online-dot"></span> {t('chatbot.subtitle')}
                </span>
              </div>
            </div>

            <button 
              className="ai-close-btn"
              onClick={handleCloseChat}
              aria-label="Yopish"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="ai-chat-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-msg-row ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="ai-msg-avatar">
                    <Bot size={14} color="#00f0ff" />
                  </div>
                )}
                <div className={`ai-bubble ${msg.sender}`}>
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} style={{ margin: i > 0 ? '6px 0 0 0' : 0 }}>
                      {line}
                    </p>
                  ))}

                  {/* Embedded Interactive Product Cards */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="ai-products-grid">
                      {msg.products.map(prod => (
                        <div key={prod.id} className="ai-prod-card">
                          <img src={prod.image} alt={prod.name} className="ai-prod-img" />
                          <div className="ai-prod-details">
                            <span className="ai-prod-brand">{prod.brand}</span>
                            <h5 className="ai-prod-name">{prod.name}</h5>
                            <div className="ai-prod-price">
                              {new Intl.NumberFormat('uz-UZ').format(prod.price)} so'm
                            </div>
                          </div>
                          <div className="ai-prod-btns">
                            <button 
                              className="ai-add-cart-btn"
                              onClick={() => {
                                soundFX.playPowerUp();
                                addToCart(prod);
                              }}
                              title="Savatga qo'shish"
                            >
                              <ShoppingBag size={13} />
                              <span>Savatga</span>
                            </button>
                            <button 
                              className="ai-view-prod-btn"
                              onClick={() => {
                                soundFX.playClick();
                                setIsOpen(false);
                                navigate(`/product/${prod.id}`);
                              }}
                              title="Batafsil ko'rish"
                            >
                              <ExternalLink size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Link Button (e.g. PC Builder or Reflex Game) */}
                  {msg.actionLink && (
                    <button 
                      className="ai-action-btn"
                      onClick={() => {
                        soundFX.playClick();
                        setIsOpen(false);
                        navigate(msg.actionLink.url);
                      }}
                    >
                      <span>{msg.actionLink.label}</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-msg-row bot">
                <div className="ai-msg-avatar">
                  <Bot size={14} color="#00f0ff" />
                </div>
                <div className="ai-bubble bot typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips */}
          <div className="ai-quick-chips">
            {quickPrompts.map((prompt, i) => (
              <button 
                key={i} 
                className="chip-btn"
                onClick={() => handleSend(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form className="ai-input-form" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chatbot.placeholder')}
            />
            <button type="submit" className="ai-send-btn" disabled={!input.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
