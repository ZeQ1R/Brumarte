import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const ContactSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    toast.success('Message sent successfully!', {
      description: 'We will get back to you soon.',
    });
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const hours = [
    { day: 'monday', time: '12:00 - 23:00' },
    { day: 'tuesday', time: '12:00 - 23:00' },
    { day: 'wednesday', time: '12:00 - 23:00' },
    { day: 'thursday', time: '12:00 - 23:00' },
    { day: 'friday', time: '12:00 - 00:00' },
    { day: 'saturday', time: '12:00 - 00:00' },
    { day: 'sunday', time: t('contact.closed') },
  ];

  return (
    <section
      id="contact"
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
          <span className="font-body text-primary text-sm tracking-[0.2em] uppercase font-medium">
            {t('contact.sectionTitle')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground font-bold mt-3 mb-4">
            {t('contact.sectionSubtitle')}
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div
            className={cn(
              'transition-all duration-700',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            )}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block">
                        {t('contact.name')}
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block">
                        {t('contact.phone')}
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      {t('contact.email')}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      {t('contact.message')}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-background resize-none"
                    />
                  </div>
                  <Button type="submit" variant="premium" size="lg" className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    {t('contact.send')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div
            className={cn(
              'space-y-6 transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            )}
          >
            {/* Address */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {t('contact.address')}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Ul. Ilindenska 123<br />
                    1200 Tetovo, North Macedonia
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Phone & Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-medium text-foreground mb-1">
                      {t('contact.phone')}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm">
                      +389 44 123 456
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-medium text-foreground mb-1">
                      {t('contact.email')}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm">
                      info@brumarte.mk
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Opening Hours */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {t('contact.openingHours')}
                  </h3>
                </div>
                <div className="space-y-2">
                  {hours.map((item) => (
                    <div key={item.day} className="flex justify-between font-body text-sm">
                      <span className="text-muted-foreground">{t(`contact.${item.day}`)}</span>
                      <span className={cn(
                        'font-medium',
                        item.time === t('contact.closed') ? 'text-destructive' : 'text-foreground'
                      )}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <div
          id="visit"
          className={cn(
            'mt-12 rounded-xl overflow-hidden h-[300px] lg:h-[400px] bg-muted border border-border transition-all duration-700 delay-300',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47482.45088252698!2d20.9517773!3d42.0103921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1353efa2b6e22c59%3A0x5f1f7fe2e5fa7d2!2sTetovo%2C%20North%20Macedonia!5e0!3m2!1sen!2s!4v1699000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Brumarte Location"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
