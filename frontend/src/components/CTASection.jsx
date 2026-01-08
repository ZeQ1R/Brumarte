import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export const CTASection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScroll = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-secondary relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1920&q=60"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/95 to-secondary/90" />
      </div>

      {/* Fire Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-primary/15 via-terracotta/10 to-transparent blur-3xl fire-glow" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          className={cn(
            'max-w-3xl mx-auto text-center transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-primary/50" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-16 bg-primary/50" />
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-secondary-foreground font-bold mb-6 leading-tight">
            {t('cta.headline')}
          </h2>

          {/* Subheading */}
          <p className="font-body text-lg text-secondary-foreground/80 mb-10">
            {t('cta.subheading')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="premium"
              size="xl"
              className="min-w-[180px]"
              onClick={() => handleScroll('#menu')}
            >
              {t('cta.orderNow')}
            </Button>
            <Button
              variant="premium-outline"
              size="xl"
              className="min-w-[180px]"
              onClick={() => handleScroll('#contact')}
            >
              {t('cta.makeReservation')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
