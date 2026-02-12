
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { askPortfolioAI } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi there! I\'m Felicia\'s AI assistant. Ask me anything about her work, skills, or experience!', feedback: null }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isTyping, isOpen]);

  // Keyboard shortcut: Cmd+K or Ctrl+K to toggle chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    // Fix: Add missing 'feedback' property to the message object to match the Message interface requirements
    setMessages(prev => [...prev, { role: 'user', content: userMessage, feedback: null }]);
    setIsTyping(true);

    const historyForAI = messages.slice(-6);
    const aiResponse = await askPortfolioAI(userMessage, historyForAI);
    
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse, feedback: null }]);
    setIsTyping(false);
  };

  const handleFeedback = (index: number, feedback: 'positive' | 'negative') => {
    setMessages(prev => {
      const next = [...prev];
      // Toggle if already selected
      if (next[index].feedback === feedback) {
        next[index].feedback = null;
      } else {
        next[index].feedback = feedback;
      }
      return next;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div 
          id="ai-chat-window"
          role="dialog"
          aria-label="AI Portfolio Assistant Chat"
          className="absolute bottom-20 right-0 w-[90vw] max-w-[400px] h-[500px] glass rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-indigo-600/20">
            <div>
              <h3 className="font-bold text-indigo-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true"></span>
                AI Portfolio Assistant
              </h3>
              <p className="text-xs text-white/50">Ask me anything about Felicia</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/50 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4"
            aria-live="polite"
            role="log"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white/10 text-white/90 rounded-bl-none'
                }`}>
                  <span className="sr-only">{m.role === 'user' ? 'You:' : 'Assistant:'}</span>
                  {m.content}
                </div>
                
                {/* Feedback buttons for assistant messages */}
                {m.role === 'assistant' && (
                  <div className="flex gap-2 mt-1 ml-1 opacity-60 hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleFeedback(i, 'positive')}
                      className={`p-1 transition-colors ${m.feedback === 'positive' ? 'text-green-400' : 'text-white/30 hover:text-white'}`}
                      aria-label="Thumbs up"
                      title="Good response"
                    >
                      <svg className="w-4 h-4" fill={m.feedback === 'positive' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.708c.94 0 1.667.767 1.482 1.654l-1.34 6.425C18.669 19.051 17.79 20 16.764 20H7.236c-1.026 0-1.905-.949-2.086-1.921l-1.34-6.425C3.625 10.767 4.352 10 5.292 10H10V4.236C10 3.001 11.001 2 12.236 2h.154C13.518 2 14 3.001 14 4.236V10z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleFeedback(i, 'negative')}
                      className={`p-1 transition-colors ${m.feedback === 'negative' ? 'text-rose-400' : 'text-white/30 hover:text-white'}`}
                      aria-label="Thumbs down"
                      title="Bad response"
                    >
                      <svg className="w-4 h-4" fill={m.feedback === 'negative' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.292c-.94 0-1.667-.767-1.482-1.654l1.34-6.425C5.331 4.949 6.21 4 7.236 4h9.528c1.026 0 1.905.949 2.086 1.921l1.34 6.425c.185.887-.542 1.654-1.482 1.654H14v5.764C14 20.999 12.999 22 11.764 22h-.154C10.482 22 10 20.999 10 19.764V14z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start" aria-label="Assistant is typing">
                <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/10">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Felicia's skills..."
                aria-label="Type your message"
                className="w-full bg-black/40 border border-white/10 rounded-full py-2.5 px-4 pr-12 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
              />
              <button 
                type="submit"
                disabled={isTyping}
                aria-label="Send message"
                className="absolute right-2 top-1.5 p-1 text-indigo-400 hover:text-indigo-300 disabled:opacity-50 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-white/30 mt-2 text-center">
              Press <kbd className="font-sans px-1 border border-white/10 rounded">Cmd+K</kbd> to toggle
            </p>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        aria-expanded={isOpen}
        aria-controls="ai-chat-window"
        className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-500 hover:scale-110 active:scale-95 transition-all group focus:ring-2 focus:ring-indigo-400 focus:outline-none"
      >
        {isOpen ? (
           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <div className="relative">
             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </div>
        )}
      </button>
    </div>
  );
};

export default AIChat;
