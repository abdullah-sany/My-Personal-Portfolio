import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai'|'user', content: string}[]>([
    { role: 'ai', content: 'Hello. I am the Sany-OS Assistant. How can I help you navigate this portfolio?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: newMsg }]);
    setInput('');
    
    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: 'I am a localized interface for this portfolio. To learn more about Sany\'s work, feel free to browse the Bento grid or drop a message in the contact form.' 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-blue-600 shadow-[0_0_20px_rgba(0,122,255,0.4)] flex items-center justify-center text-app-text hover:scale-110 transition-transform"
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 w-80 sm:w-96 h-[500px] glass-panel rounded-2xl flex flex-col overflow-hidden border-blue-500/20"
          >
            {/* Header */}
            <div className="h-16 border-b border-app-border bg-app-card/60 flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-[8px] animate-pulse" />
                  <div className="w-8 h-8 rounded-full bg-app-card border border-app-border relative z-10 flex items-center justify-center text-xs font-mono">AI</div>
                </div>
                <span className="font-medium text-sm text-app-text/90">Sany Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-text hover:text-app-text">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl p-3 text-sm ${msg.role === 'user' ? 'bg-blue-600 text-app-text' : 'glass-card text-app-text/80'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-app-card/40 border-t border-app-border">
              <form onSubmit={handleSend} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-app-card border border-app-border rounded-xl px-4 py-3 pr-12 text-sm text-app-text placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-400 hover:text-blue-300">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
