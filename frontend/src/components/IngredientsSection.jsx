import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Wheat, Leaf, Circle, Droplets, Flame, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const ingredientIcons = {
  flour: Wheat,
  tomatoes: Circle,
  mozzarella: Circle,
  olive: Droplets,
  woodFired: Flame,
  handmade: Heart,
};

const ingredientKeys = ['flour', 'tomatoes', 'mozzarella', 'olive', 'woodFired', 'handmade'];

export const IngredientsSection = () => {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-muted relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1920&q=60"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={cn(
            'text-center mb-16 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="font-body text-olive text-sm tracking-[0.2em] uppercase font-medium">
            {t('ingredients.sectionTitle')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground font-bold mt-3 mb-4">
            {t('ingredients.sectionSubtitle')}
          </h2>
          <div className="section-divider" />
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {ingredientKeys.map((key, index) => {
            const Icon = ingredientIcons[key] || Leaf;
            return (
              <div
                key={key}
                className={cn(
                  'group text-center p-6 bg-card rounded-xl border border-border transition-all duration-500 hover:shadow-card hover:-translate-y-1',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-olive/10 rounded-full flex items-center justify-center group-hover:bg-olive/20 transition-colors duration-300">
                  <Icon className="h-6 w-6 text-olive" />
                </div>
                <p className="font-body text-sm text-foreground font-medium leading-snug">
                  {t(`ingredients.${key}`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;
