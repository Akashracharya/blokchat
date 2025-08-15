import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import RoomList from './components/RoomList';
import ChatWindow from './components/ChatWindow';
import AIChatbot from './components/AIChatbot';
import { dummyRooms, dummyMessages, dummyBotMessages, Message } from './data/dummyData';

function App() {
  const [activeRoom, setActiveRoom] = useState('1');
  const [messages, setMessages] = useState<Record<string, Message[]>>(dummyMessages);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBotPanelOpen, setIsBotPanelOpen] = useState(false);

  // Close mobile panels when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
      if (window.innerWidth >= 1280) {
        setIsBotPanelOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRoomSelect = (roomId: string) => {
    setActiveRoom(roomId);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSent: true,
      transactionId: `tx_${Math.random().toString(36).substring(2, 8)}`
    };

    setMessages(prev => ({
      ...prev,
      [activeRoom]: [...(prev[activeRoom] || []), newMessage]
    }));
  };

  const activeRoomData = dummyRooms.find(room => room.id === activeRoom);
  const currentMessages = messages[activeRoom] || [];

  return (
    <div className="h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center text-white overflow-hidden flex flex-col">
      {/* Header */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onToggleBotPanel={() => setIsBotPanelOpen(!isBotPanelOpen)}
        isSidebarOpen={isSidebarOpen}
        isBotPanelOpen={isBotPanelOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-4 flex justify-center items-start">
        <div className="flex h-[86vh] max-w-[1200px] w-full bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-700 relative mb-0 lg:mb-8">
          
          {/* Left Sidebar - Rooms */}
          <RoomList
            rooms={dummyRooms}
            activeRoom={activeRoom}
            onRoomSelect={handleRoomSelect}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Chat Area */}
          <motion.div
            className="flex-1 flex min-w-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex-1 min-w-0">
              <ChatWindow
                messages={currentMessages}
                onSendMessage={handleSendMessage}
                activeRoomName={activeRoomData?.name || 'Unknown Room'}
              />
            </div>
          </motion.div>

          {/* Right Panel - AI Chatbot (DESKTOP ONLY) */}
          <div className="hidden xl:flex w-[350px] p-3">
            <div className="flex-1 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg overflow-hidden">
              <AIChatbot
                isOpen={true}
                onClose={() => { }}
                initialMessages={dummyBotMessages}
                variant="desktop"
              />
            </div>
          </div>


          {/* Mobile Overlay (MOBILE ONLY) */}
          <AIChatbot
            isOpen={isBotPanelOpen}
            onClose={() => setIsBotPanelOpen(false)}
            initialMessages={dummyBotMessages}
            variant="mobile"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
