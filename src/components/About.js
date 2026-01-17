import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Target, Zap, Award } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: {
      opacity:  1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition:  { duration: 0.6 },
    },
  };

  const cards = [
    {
      icon: Users,
      title: 'Expert Team',
      description: 'A diverse group of talented developers, designers, and AI specialists working together.',
    },
    {
      icon: Target,
      title:  'Clear Vision',
      description: 'Focused on creating innovative solutions that solve real-world problems.',
    },
    {
      icon: Zap,
      title: 'Fast Innovation',
      description: 'Rapid prototyping and deployment of cutting-edge technologies.',
    },
    {
      icon: Award,
      title: 'Fast Excellience',
      description: 'Recognized for excellence in AI development and technological innovation.',
    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            About <span className="gradient-text">RPA</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We are a passionate team of innovators dedicated to pushing the boundaries of
            artificial intelligence and machine learning. Our mission is to create intelligent
            solutions that empower businesses and individuals to achieve more.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ?  "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-effect rounded-3xl p-8 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-purple-500/50">
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{card.title}</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y:  50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 glass-effect rounded-3xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold mb-6 gradient-text">Our Journey</h3>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Founded in 2022, RPA has grown from a small club to a leading force in AI innovation.
            We've successfully delivered over 500 projects, collaborated with industry giants, and continue
            to shape the future of technology with every line of code we write.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;