import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Motto from '../components/Motto';
import ChatbotSection from '../components/ChatbotSection';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />
      <Header />
      <Hero />
      <About />
      <Features />
      <Motto />
      <ChatbotSection />
      <Footer />
    </div>
  );
};

export default LandingPage;