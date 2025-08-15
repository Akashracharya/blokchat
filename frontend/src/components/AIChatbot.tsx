import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, X } from 'lucide-react';
import { BotMessage } from '../data/dummyData';

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessages: BotMessage[];
  variant?: 'desktop' | 'mobile';
}

const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onClose, initialMessages, variant = 'desktop' }) => {
  const [messages, setMessages] = useState<BotMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBotResponse = (userMessage: string): string => {
    const responses = [
      "That's an interesting point! Let me think about that...",
      "I understand your question. Here's what I think:",
      "Great question! Based on my knowledge:",
      "Let me help you with that:",
      "That's a thoughtful inquiry. My suggestion would be:"
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return `${randomResponse} Regarding "${userMessage}", I'd be happy to provide some insights and recommendations.`;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg: BotMessage = {
      id: Date.now().toString(),
      content: newMessage,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMsg: BotMessage = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(userMsg.content),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);

    inputRef.current?.focus();
  };

  // === Shared inner UI ===
  const ChatbotUI = (
    <div className="h-full rounded-none bg-gray-800/40 border-l border-gray-600/30 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-600/30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
        </div>
        <motion.button
          onClick={onClose}
          className="xl:hidden p-1 text-gray-400 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`max-w-xs ${message.isBot ? 'order-1' : 'order-2'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  {message.isBot ? (
                    <>
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Bot size={12} className="text-white" />
                      </div>
                      <span className="text-xs text-gray-400">AI Assistant</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs text-gray-400">You</span>
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <User size={12} className="text-white" />
                      </div>
                    </>
                  )}
                </div>

                <motion.div
                  className={`
                    px-3 py-2 rounded-2xl shadow-lg backdrop-blur-sm
                    ${message.isBot
                      ? 'bg-purple-600/20 border border-purple-500/30 text-gray-100'
                      : 'bg-blue-600/80 text-white'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <span className="text-xs opacity-70 block mt-2">{message.timestamp}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-purple-600/20 border border-purple-500/30 rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex space-x-2 items-center">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-600/30">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask AI anything..."
              disabled={isTyping}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm disabled:opacity-50"
            />
          </div>
          <motion.button
            type="submit"
            disabled={!newMessage.trim() || isTyping}
            className="p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
            whileHover={newMessage.trim() && !isTyping ? { scale: 1.05 } : {}}
            whileTap={newMessage.trim() && !isTyping ? { scale: 0.95 } : {}}
          >
            <Send size={16} />
          </motion.button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {variant === 'mobile' && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
          )}
        </AnimatePresence>
      )}

      {variant === 'mobile' ? (
        <motion.div
          className="fixed inset-y-0 right-0 z-50 xl:hidden w-[92vw] max-w-sm bg-gray-900/90 backdrop-blur-md flex flex-col"
          initial={{ x: '100%' }}
          animate={{ x: isOpen ? 0 : '100%' }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        >
          {ChatbotUI}
        </motion.div>
      ) : (
        <motion.div
          className="relative h-full w-full bg-gray-900/80 backdrop-blur-md flex flex-col"
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {ChatbotUI}
        </motion.div>
      )}
    </>
  );
};

export default AIChatbot;
