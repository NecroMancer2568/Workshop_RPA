import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const Motto = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="motto" className="relative py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Main Motto Card */}
          <div className="glass-effect rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-10 left-10 opacity-20">
              <Quote className="w-24 h-24 text-purple-400" />
            </div>
            <div className="absolute bottom-10 right-10 opacity-20 rotate-180">
              <Quote className="w-24 h-24 text-cyan-400" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-8 gradient-text relative z-10"
            >
              Our Motto
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold mb-6 text-white leading-relaxed relative z-10"
            >
              "Innovate. Automate. Elevate."
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed relative z-10"
            >
              At NecroTech, we believe in transforming the impossible into reality. Our mission is to
              harness the power of artificial intelligence to create solutions that not only meet today's
              challenges but anticipate tomorrow's opportunities.
            </motion.p>

            {/* What We Provide */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative z-10"
            >
              <h3 className="text-3xl font-bold mb-8 gradient-text">What We Provide</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                {
                  title: 'AI Consultation',
                  description: 'Expert guidance on implementing AI solutions tailored to your needs',
                },
                {
                  title: 'Custom Development',
                  description: 'Bespoke AI systems designed and built from the ground up',
                },
                {
                  title: 'Training & Support',
                  description: 'Comprehensive training programs and 24/7 technical support',
                },
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <h4 className="text-xl font-bold mb-3 text-white">{service.title}</h4>
                    <p className="text-gray-400">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            {[
              { title: 'Innovation First', emoji: '💡' },
              { title: 'User-Centric', emoji: '❤️' },
              { title: 'Excellence Always', emoji: '🏆' },
            ].map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-2xl p-6 text-center"
              >
                <div className="text-5xl mb-3">{value.emoji}</div>
                <h4 className="text-xl font-bold gradient-text">{value.title}</h4>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Motto;