import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, Bot, User, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: 'Hi! 👋 I\'m your AI assistant prsented by RPA TechTeam.  How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      console.log('Sending message to backend:', userMessage);
      console.log('Request URL: http://localhost:5001/chat');
      
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorData = {};
        try {
          const text = await response.text();
          console.log('Error response text:', text);
          errorData = JSON.parse(text);
        } catch (e) {
          console.error('Failed to parse error response:', e);
          errorData = { error: `Server error: ${response.status} ${response.statusText}` };
        }
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.reply) {
        throw new Error('No reply received from server');
      }

      // Simulate typing delay
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'bot', content: data.reply }]);
        setIsTyping(false);
      }, 500);
    } catch (error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      
      setTimeout(() => {
        let errorMessage = 'Sorry, something went wrong. Please try again.';
        
        // Provide more specific error messages
        if (error.message) {
          errorMessage = error.message;
        } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
          errorMessage = 'Cannot connect to the server. Please make sure the Flask backend is running on http://localhost:5001';
        } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          errorMessage = 'Network error: Cannot connect to the server. Make sure the Flask backend is running on http://localhost:5001';
        }
        
        setMessages((prev) => [
          ...prev,
          { role: 'bot', content: errorMessage },
        ]);
        setIsTyping(false);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-10 glass-effect border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale:  0.9 }}
                onClick={() => navigate('/')}
                className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">AI Chatbot</h1>
                  <p className="text-xs text-gray-400">Powered by RPA</p>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="hidden md:flex items-center space-x-2 px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Chat Container */}
      <div className="flex-1 relative z-10 container mx-auto px-6 py-8 flex flex-col max-w-5xl">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-6 mb-6 scroll-smooth">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity:  1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale:  1 }}
                  transition={{ delay: 0.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'bot'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-gradient-to-br from-cyan-500 to-blue-500'
                  }`}
                >
                  {message.role === 'bot' ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </motion.div>

                {/* Message Content */}
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    message.role === 'bot'
                      ? 'bg-white/10 backdrop-blur-lg border border-white/20 rounded-tl-none'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 rounded-tr-none'
                  }`}
                >
                  <p className="text-white leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity:  1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl rounded-tl-none p-4 flex space-x-2">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-purple-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-purple-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration:  0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-purple-400 rounded-full"
                />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="glass-effect rounded-3xl p-4 border border-white/20"
        >
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                rows="1"
                className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none max-h-32 py-3 px-4"
                style={{ minHeight: '48px' }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          </div>
          <div className="mt-2 text-xs text-gray-400 text-center">
            Press <kbd className="px-2 py-1 bg-white/10 rounded">Enter</kbd> to send •{' '}
            <kbd className="px-2 py-1 bg-white/10 rounded">Shift + Enter</kbd> for new line
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex flex-wrap gap-2 justify-center"
        >
          {[
            'Tell me about AI',
            'How can you help me? ',
            'What are your features?',
            'Tell me a joke',
          ].map((suggestion, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setInput(suggestion)}
              className="px-4 py-2 bg-white/5 backdrop-blur-lg rounded-full text-sm text-gray-300 hover:bg-white/10 border border-white/10 transition-all"
            >
              <Sparkles className="w-3 h-3 inline mr-1" />
              {suggestion}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ChatbotPage;