import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent } from './ui/card';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const chefImages = [
  'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=500&q=80',
];

export const ChefsSection = () => {
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

  const chefs = ['ruffi', 'bily'];

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div
          className={cn(
            'text-center mb-16 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="font-body text-primary text-sm tracking-[0.2em] uppercase font-medium">
            {t('chefs.sectionTitle')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground font-bold mt-3 mb-4">
            {t('chefs.sectionSubtitle')}
          </h2>
          <div className="section-divider" />
        </div>

        {/* Chefs Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {chefs.map((chef, index) => (
            <Card
              key={chef}
              className={cn(
                'group bg-card border-border overflow-hidden transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative">
                {/* Chef Image */}
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={chefImages[index]}
                    alt={t(`chefs.${chef}.name`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Quote className="h-5 w-5" />
                </div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-display text-2xl font-semibold text-foreground mb-1">
                  {t(`chefs.${chef}.name`)}
                </h3>
                <p className="font-body text-primary text-sm font-medium mb-4">
                  {t(`chefs.${chef}.title`)}
                </p>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {t(`chefs.${chef}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefsSection;
