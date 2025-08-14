import React from 'react';
import { motion } from 'framer-motion';
import { Menu, MessageCircle, Bot } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleBotPanel: () => void;
  isSidebarOpen: boolean;
  isBotPanelOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onToggleSidebar, 
  onToggleBotPanel, 
  isSidebarOpen, 
  isBotPanelOpen 
}) => {
  return (
    <motion.header 
      className="h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 flex items-center justify-between px-4 lg:px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left side - Menu button for mobile */}
      <div className="flex items-center space-x-4">
        <motion.button
          className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          onClick={onToggleSidebar}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu size={20} />
        </motion.button>
        
        <div className="flex items-center space-x-2">
          <MessageCircle className="text-blue-400" size={24} />
          <h1 className="text-xl font-semibold text-white">Blokchat</h1>
        </div>
      </div>

      {/* Right side - Bot panel toggle for mobile/tablet */}
      <motion.button
        className="xl:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        onClick={onToggleBotPanel}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bot size={20} />
        {!isBotPanelOpen && (
          <motion.span 
            className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}
      </motion.button>
    </motion.header>
  );
};

export default Header;