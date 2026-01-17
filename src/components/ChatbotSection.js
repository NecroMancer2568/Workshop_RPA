import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Sparkles, Zap, ArrowRight } from 'lucide-react';

const ChatbotSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  const features = [
    { icon: MessageCircle, text: 'Natural Conversations' },
    { icon: Sparkles, text: 'Gemini AI Powered' },
    { icon:  Zap, text: 'Instant Responses' },
  ];

  return (
    <section id="chatbot" className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity:  0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Main Card */}
          <div className="glass-effect rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Content */}
              <div className="p-12 flex flex-col justify-center">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } :  {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  Try Our{' '}
                  <span className="gradient-text">AI Chatbot</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                >
                  Experience the power of conversational AI.  Our chatbot uses advanced natural
                  language processing to understand and respond to your queries with human-like
                  intelligence.
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-4 mb-8"
                >
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-lg text-gray-300">{feature.text}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/chatbot')}
                  className="btn-primary flex items-center justify-center space-x-2 w-full md:w-auto group"
                >
                  <span>Launch Chatbot</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </div>

              {/* Right Side - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-12 flex items-center justify-center relative overflow-hidden"
              >
                {/* Animated circles */}
                <div className="absolute inset-0">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 4, repeat:  Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"
                  ></motion.div>
                  <motion.div
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-500 rounded-full filter blur-3xl"
                  ></motion.div>
                </div>

                {/* Chat Preview */}
                <div className="relative z-10 w-full max-w-sm">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 space-y-4">
                    {/* Bot Message */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/20 rounded-2xl rounded-tl-none p-4">
                        <p className="text-sm text-white">
                          Hi!  I'm your AI assistant. How can I help you today? 
                        </p>
                      </div>
                    </motion.div>

                    {/* User Message */}
                    <motion.div
                      initial={{ opacity:  0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration:  0.6, delay: 1.2 }}
                      className="flex items-start space-x-3 justify-end"
                    >
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl rounded-tr-none p-4">
                        <p className="text-sm text-white">Tell me about your features</p>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white">👤</span>
                      </div>
                    </motion.div>

                    {/* Bot Typing */}
                    <motion.div
                      initial={{ opacity:  0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: 1.4 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/20 rounded-2xl p-4 flex space-x-2">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-white rounded-full"
                        ></motion.div>
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay:  0.2 }}
                          className="w-2 h-2 bg-white rounded-full"
                        ></motion.div>
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration:  0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-white rounded-full"
                        ></motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 text-lg">
              Presented by<span className="text-purple-400 font-semibold"></span> RPA team•
              Available 24/7 • Free to use
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatbotSection;