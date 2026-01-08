import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const HeroSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScroll = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1920&q=80"
          alt="Neapolitan Pizza"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal/80" />
        {/* Noise Texture */}
        <div className="noise-overlay" />
      </div>

      {/* Fire Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-primary/20 via-terracotta/10 to-transparent blur-3xl opacity-60 fire-glow" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div
          className={cn(
            'max-w-4xl mx-auto transition-all duration-1000',
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          )}
        >
          {/* Decorative Element */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-primary-foreground/40" />
            <span className="font-body text-primary-foreground/70 text-sm tracking-[0.3em] uppercase">
              Est. 2024 • Tetovo
            </span>
            <div className="h-px w-12 bg-primary-foreground/40" />
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary-foreground font-bold leading-tight mb-6 text-shadow-warm">
            {t('hero.headline')}
          </h1>

          {/* Subheading */}
          <p className="font-body text-lg sm:text-xl text-primary-foreground/85 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero.subheading')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="premium"
              size="xl"
              onClick={() => handleScroll('#menu')}
              className="min-w-[180px]"
            >
              {t('hero.viewMenu')}
            </Button>
            <Button
              variant="premium-outline"
              size="xl"
              onClick={() => handleScroll('#visit')}
              className="min-w-[180px]"
            >
              {t('hero.visitUs')}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <button
          onClick={() => handleScroll('#menu')}
          className="flex flex-col items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300 scroll-indicator"
        >
          <span className="font-body text-xs tracking-wider uppercase">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
