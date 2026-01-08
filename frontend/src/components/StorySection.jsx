import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '@/lib/utils';

const stats = [
  { key: 'yearsExperience', value: '15+' },
  { key: 'pizzasServed', value: '50K+' },
  { key: 'happyCustomers', value: '25K+' },
];

export const StorySection = () => {
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
      id="story"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-secondary text-secondary-foreground relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <img
            src="https://images.unsplash.com/photo-1659777926146-a1ce9931b979?auto=format&fit=crop&w=800&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/70" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div
            className={cn(
              'transition-all duration-1000',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            )}
          >
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary" />
              <span className="font-body text-primary text-sm tracking-[0.2em] uppercase font-medium">
                {t('story.sectionTitle')}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              {t('story.sectionSubtitle')}
            </h2>

            <div className="space-y-6 font-body text-secondary-foreground/85 leading-relaxed">
              <p className="text-lg">
                {t('story.paragraph1')}
              </p>
              <p>
                {t('story.paragraph2')}
              </p>
              <p>
                {t('story.paragraph3')}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div
                  key={stat.key}
                  className={cn(
                    'text-center transition-all duration-700',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  )}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                >
                  <div className="font-display text-3xl lg:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs sm:text-sm text-secondary-foreground/70 uppercase tracking-wider">
                    {t(`story.${stat.key}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div
            className={cn(
              'relative transition-all duration-1000 delay-300',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            )}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-elevated">
                  <img
                    src="https://images.unsplash.com/photo-1622880833523-7cf1c0bd4296?auto=format&fit=crop&w=500&q=80"
                    alt="Pizza making"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden shadow-elevated">
                  <img
                    src="https://images.pexels.com/photos/3343627/pexels-photo-3343627.jpeg?auto=compress&cs=tinysrgb&w=500"
                    alt="Wood fired oven"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-lg overflow-hidden shadow-elevated">
                  <img
                    src="https://images.unsplash.com/photo-1659778099584-8c61edf20a61?auto=format&fit=crop&w=500&q=80"
                    alt="Oven flames"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-elevated">
                  <img
                    src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=500"
                    alt="Restaurant ambiance"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground px-6 py-4 rounded-lg shadow-elevated fire-glow">
              <div className="font-display text-2xl font-bold">15+</div>
              <div className="font-body text-xs uppercase tracking-wider opacity-90">Years</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
