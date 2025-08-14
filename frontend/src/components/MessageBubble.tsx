import React from 'react';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
import { Message } from '../data/dummyData';

interface MessageBubbleProps {
  message: Message;
  index: number;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, index }) => {
  const copyTransactionId = () => {
    if (message.transactionId) {
      navigator.clipboard.writeText(message.transactionId);
    }
  };

  return (
    <motion.div
      className={`flex ${message.isSent ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.isSent ? 'order-2' : 'order-1'}`}>
        {/* Sender name for received messages */}
        {!message.isSent && (
          <p className="text-sm text-gray-400 mb-1 ml-3">{message.sender}</p>
        )}
        
        <motion.div
          className={`
            px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm
            ${message.isSent 
              ? 'bg-blue-600/80 text-white' 
              : 'bg-gray-700/80 text-gray-100 border border-gray-600/30'
            }
          `}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
          
          {/* Message footer */}
          <div className={`flex items-center justify-between mt-2 ${message.isSent ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-xs opacity-70">{message.timestamp}</span>
            
            {message.transactionId && (
              <motion.button
                onClick={copyTransactionId}
                className={`
                  flex items-center space-x-1 text-xs opacity-60 hover:opacity-100 
                  px-2 py-1 rounded-md transition-all
                  ${message.isSent ? 'hover:bg-blue-700/50' : 'hover:bg-gray-600/50'}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Copy size={12} />
                <span>TX: {message.transactionId.slice(-6)}</span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;