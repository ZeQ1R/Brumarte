import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/3343627/pexels-photo-3343627.jpeg?auto=compress&cs=tinysrgb&w=500',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1593548615309-5a45c504f994?auto=format&fit=crop&w=500&q=80',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1659777926146-a1ce9931b979?auto=format&fit=crop&w=500&q=80',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: 'col-span-2 row-span-1',
  },
];

export const GallerySection = () => {
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
      id="gallery"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-background"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div
          className={cn(
            'text-center mb-16 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="h-5 w-5 text-primary" />
            <span className="font-body text-primary text-sm tracking-[0.2em] uppercase font-medium">
              {t('gallery.sectionTitle')}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground font-bold mb-4">
            {t('gallery.sectionSubtitle')}
          </h2>
          <div className="section-divider" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 auto-rows-[200px] lg:auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                'group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-700',
                image.span,
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="bg-primary/90 text-primary-foreground p-3 rounded-full">
                  <Camera className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
