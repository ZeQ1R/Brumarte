import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Flame, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const pizzaImages = [
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
];

const pizzaKeys = ['margherita', 'diavola', 'quattroFormaggi', 'prosciutto', 'capricciosa', 'marinara'];

const pizzaPrices = ['€8.50', '€9.50', '€10.00', '€11.00', '€10.50', '€7.50'];

export const PizzasSection = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gradient-section relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={cn(
            'text-center mb-16 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="h-5 w-5 text-primary" />
            <span className="font-body text-primary text-sm tracking-[0.2em] uppercase font-medium">
              {t('pizzas.sectionTitle')}
            </span>
            <Flame className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            {t('pizzas.sectionSubtitle')}
          </h2>
          <div className="section-divider" />
        </div>

        {/* Pizza Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pizzaKeys.map((key, index) => (
            <Card
              key={key}
              className={cn(
                'group bg-card border-border overflow-hidden card-hover transition-all duration-700',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Pizza Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={pizzaImages[index]}
                  alt={t(`pizzas.${key}.name`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full font-body text-sm font-semibold shadow-lg">
                  {pizzaPrices[index]}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {t(`pizzas.${key}.name`)}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {t(`pizzas.${key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Full Menu Button */}
        <div
          className={cn(
            'text-center mt-12 transition-all duration-700 delay-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Button variant="outline" size="lg" className="gap-2 group">
            {t('pizzas.viewFullMenu')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PizzasSection;
