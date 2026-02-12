
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { askTourExpert } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Welcome to the PPC Tour! Ask me anything about rankings, rules, or upcoming matches!', feedback: null }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage, feedback: null }]);
    setIsTyping(true);

    const aiResponse = await askTourExpert(userMessage, messages.slice(-5));
    
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse, feedback: null }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[90vw] max-w-[400px] h-[500px] glass rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300 border-indigo-500/30">
          <div className="p-4 bg-indigo-600 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
              PPC Tour Expert
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/90'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-xs text-white/50 italic px-2">Assistant is analyzing the kitchen...</div>}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/40">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pro rankings..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-4 text-sm focus:outline-none focus:border-yellow-500/50"
            />
          </form>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
};

export default AIChat;
