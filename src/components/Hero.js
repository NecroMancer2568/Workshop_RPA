import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { useEffect } from 'react';
const Hero = () => {
  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

// Inside your component, before the return statement:
useEffect(() => {
  const hideSplineLogo = () => {
    // Method 1: Shadow DOM
    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
      if (splineViewer.shadowRoot) {
        const shadowElements = splineViewer.shadowRoot.querySelectorAll('*');
        shadowElements.forEach(el => {
          const styles = window.getComputedStyle(el);
          if (styles.backgroundImage && styles.backgroundImage.includes('logo')) {
            el.style.display = 'none';
          }
          if (el.innerHTML && el.innerHTML.toLowerCase().includes('spline')) {
            el.style.display = 'none';
          }
        });
      }

      // Method 2: Hide entire bottom-right corner
      const style = document.createElement('style');
      style.textContent = `
        spline-viewer {
          position: relative !important;
        }
        spline-viewer::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 150px;
          height: 50px;
          background: #0a0a1f;
          z-index: 9999;
        }
      `;
      if (!document.getElementById('spline-logo-hider')) {
        style.id = 'spline-logo-hider';
        document.head.appendChild(style);
      }
    }
  };

  const timer = setTimeout(hideSplineLogo, 500);
  const interval = setInterval(hideSplineLogo, 500);

  return () => {
    clearTimeout(timer);
    clearInterval(interval);
  };
}, []);


  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    {/* Spline 3D Background */}
<div className="absolute inset-0 z-0">
  <Spline scene="https://prod.spline.design/zBdvYbfbGaBTVRbr/scene.splinecode" />
  {/* Overlay to cover logo */}
  <div className="absolute bottom-0 right-0 w-40 h-16 z-50">
  <img
    src="/Screenshot 2026-01-16 at 5.08.26 PM.png"
    alt=""
    className="w-full h-full object-cover"
  />
</div>



</div>


      {/* Content */}
      <div className="container mx-auto px-6 z-10 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Welcome to{' '}
              <span className="gradient-text">Robotics Process Automation</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            >
              Innovating the future with cutting-edge AI solutions and intelligent automation
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a href="#chatbot" className="btn-primary">
                Try Our Chatbot
              </a>
              <a href="#about" className="btn-secondary">
                Learn More
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              {[
                { number: '500+', label: 'Projects' },
                { number: '50+', label: 'Team Members' },
                { number: '100%', label: 'Innovation' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="hidden md:block"></div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
