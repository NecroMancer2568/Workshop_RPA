import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, MessageSquare, Sparkles, Shield, Rocket, TrendingUp } from 'lucide-react';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Brain,
      title: 'Advanced AI',
      description: 'Powered by cutting-edge machine learning algorithms and neural networks.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MessageSquare,
      title: 'Natural Conversations',
      description: 'Engage in human-like dialogues with context-aware responses.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Sparkles,
      title: 'Smart Automation',
      description: 'Automate complex tasks and workflows with intelligent decision-making.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols to protect your data.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Rocket,
      title: 'Lightning Fast',
      description: 'Optimized performance delivering responses in milliseconds.',
      color: 'from-red-500 to-rose-500',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Learning',
      description: 'Self-improving AI that gets smarter with every interaction.',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover what makes our AI solutions stand out from the crowd
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="glass-effect rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              
              {/* Animated underline */}
              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
            </motion.div>
          ))}
        </div>

        {/* Additional Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 glass-effect rounded-3xl p-12 text-center overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse-slow"></div>
          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-6 gradient-text">24/7 Availability</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Our AI never sleeps.  Get instant responses and support anytime, anywhere, on any device.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Web', 'Mobile', 'Desktop', 'API'].map((platform, index) => (
                <span
                  key={index}
                  className="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full font-semibold border border-white/20"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;