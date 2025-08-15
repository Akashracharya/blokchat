import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Hash } from 'lucide-react';
import { Room } from '../data/dummyData';

interface RoomListProps {
  rooms: Room[];
  activeRoom: string;
  onRoomSelect: (roomId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const RoomList: React.FC<RoomListProps> = ({ 
  rooms, 
  activeRoom, 
  onRoomSelect, 
  isOpen,
  onClose 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoomClick = (roomId: string) => {
    onRoomSelect(roomId);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`
          fixed lg:relative z-50 lg:z-auto
          w-80 lg:w-64 xl:w-[300px] h-full
          
        `}
        initial={{ x: -320 }}
        animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Mobile background (solid) */}
  <div className="block lg:hidden absolute inset-0 bg-gray-900/95 border-r border-gray-700/50"></div>
        <div className="relative flex flex-col h-full p-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Rooms List */}
          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <AnimatePresence>
              {filteredRooms.map((room, index) => (
                <motion.button
                  key={room.id}
                  className={`
                    w-full p-3 rounded-lg text-left transition-all duration-200
                    ${activeRoom === room.id 
                      ? 'bg-blue-600/20 border border-blue-500/30' 
                      : 'bg-gray-800/30 hover:bg-gray-700/50 border border-transparent'
                    }
                  `}
                  onClick={() => handleRoomClick(room.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <span className="text-lg">{room.icon}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-white truncate">
                          {room.name}
                        </h3>
                        <p className="text-xs text-gray-400 truncate mt-1">
                          {room.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-xs text-gray-400">{room.timestamp}</span>
                      {room.unreadCount > 0 && (
                        <motion.span
                          className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          {room.unreadCount}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Create Room Button */}
          <motion.button
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={18} />
            <span>Create Room</span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default RoomList;