import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Instagram, Facebook, MapPin, Heart } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { key: 'home', href: '#home' },
    { key: 'menu', href: '#menu' },
    { key: 'story', href: '#story' },
    { key: 'gallery', href: '#gallery' },
    { key: 'contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-3xl font-bold text-secondary-foreground mb-3">
              BRUMARTE
            </h3>
            <p className="font-body text-secondary-foreground/70 text-sm mb-6 max-w-md">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2 text-secondary-foreground/70">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-body text-sm">Tetovo, North Macedonia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="font-body text-sm text-secondary-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {t(`nav.${link.key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              {t('footer.followUs')}
            </h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-secondary-foreground/60">
            {t('footer.copyright')}
          </p>
          <p className="font-body text-xs text-secondary-foreground/60 flex items-center gap-1">
            {t('footer.madeWith')} <Heart className="h-3 w-3 text-primary fill-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
