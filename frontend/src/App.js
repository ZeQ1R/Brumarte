import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Toaster } from './components/ui/sonner';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PizzasSection from './components/PizzasSection';
import StorySection from './components/StorySection';
import ChefsSection from './components/ChefsSection';
import IngredientsSection from './components/IngredientsSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <PizzasSection />
          <StorySection />
          <ChefsSection />
          <IngredientsSection />
          <GallerySection />
          <TestimonialsSection />
          <CTASection />
          <ContactSection />
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </LanguageProvider>
  );
}

export default App;
