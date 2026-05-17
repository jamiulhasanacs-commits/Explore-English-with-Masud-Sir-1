
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "হ্যালো! আমি আপনার ইংরেজি প্র্যাকটিস সহযোগী। আপনি কি আজ কিছু শিখতে বা প্র্যাকটিস করতে চান?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    const botResponse = await geminiService.getEnglishPracticeResponse(userMessage);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-[350px] sm:w-[400px] h-[550px] shadow-2xl rounded-3xl flex flex-col border border-blue-100 overflow-hidden reveal">
          <div className="bg-blue-600 p-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <i className="fa-solid fa-robot text-white text-lg"></i>
              </div>
              <div>
                <span className="text-white font-bold block">AI প্র্যাকটিস বট</span>
                <span className="text-white/60 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> অনলাইন
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white bg-white/10 w-8 h-8 rounded-full flex items-center justify-center transition">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-400 p-3 rounded-2xl text-sm italic flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-150"></span>
                  </span>
                  AI লিখছে...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-white flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="আপনার প্রশ্নটি লিখুন..."
              className="flex-1 bg-slate-100 border-none rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-90"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white w-16 h-16 rounded-[2rem] shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 group relative"
        >
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
          <i className="fa-solid fa-comment-dots text-2xl group-hover:rotate-12 transition-transform"></i>
        </button>
      )}
    </div>
  );
};

export default AIChatBot;
