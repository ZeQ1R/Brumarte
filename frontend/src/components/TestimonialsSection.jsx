import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TestimonialsSection = () => {
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

  const reviews = ['review1', 'review2', 'review3'];

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-muted relative overflow-hidden"
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
            {t('testimonials.sectionTitle')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground font-bold mt-3 mb-4">
            {t('testimonials.sectionSubtitle')}
          </h2>
          <div className="section-divider" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <Card
              key={review}
              className={cn(
                'bg-card border-border transition-all duration-700 card-hover flex flex-col',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 lg:p-8 flex flex-col flex-1">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                
                {/* Review Text */}
                <p className="font-body text-foreground leading-relaxed mb-6 flex-1">
                  "{t(`testimonials.${review}.text`)}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-display text-primary font-semibold">
                      {t(`testimonials.${review}.author`).charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-body font-semibold text-foreground text-sm">
                      {t(`testimonials.${review}.author`)}
                    </div>
                    <div className="font-body text-muted-foreground text-xs">
                      {t(`testimonials.${review}.location`)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
