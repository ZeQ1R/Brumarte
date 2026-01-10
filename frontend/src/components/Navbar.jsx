import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import logo from '../images/brumarte-bg.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const { t, language, setLanguage, languageFlags, availableLanguages } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'home', href: '#home' },
    { key: 'menu', href: '#menu' },
    { key: 'story', href: '#story' },
    { key: 'gallery', href: '#gallery' },
    { key: 'visit', href: '#visit' },
    { key: 'contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-soft py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          
          <a
            href="#home"
            className="flex items-center gap-2 group"
            onClick={() => handleNavClick('#home')}
          >
            <span
              className={cn(
                'font-display text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300',
                isScrolled ? 'text-primary' : 'text-primary-foreground'
              )}
            >
              <img src={logo} alt="Brumarte Logo" className='w-20 h-15'/>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  'font-body text-sm font-medium transition-colors duration-300 underline-fancy',
                  isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-primary-foreground/90 hover:text-primary-foreground'
                )}
              >
                {t(`nav.${link.key}`)}
              </button>
            ))}
          </div>

          {/* Right Side: Language Switcher & CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'gap-1.5 font-body',
                    isScrolled
                      ? 'text-foreground hover:bg-muted'
                      : 'text-primary-foreground hover:bg-primary-foreground/10'
                  )}
                >
                  <Globe className="h-4 w-4" />
                  <span className="uppercase text-xs font-semibold">{language}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[120px] bg-card border-border">
                {availableLanguages.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      'cursor-pointer font-body gap-2',
                      language === lang && 'bg-muted'
                    )}
                  >
                    <span>{languageFlags[lang]}</span>
                    <span className="uppercase text-xs font-semibold">{lang}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button - Desktop */}
            <Button
              variant={isScrolled ? 'premium' : 'premium-outline'}
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => handleNavClick('#contact')}
            >
              {t('nav.reserve')}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'lg:hidden',
                isScrolled
                  ? 'text-foreground'
                  : 'text-primary-foreground'
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-500',
            isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          )}
        >
          <div className="bg-card rounded-lg shadow-elevated p-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-4 py-3 font-body text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors duration-200"
              >
                {t(`nav.${link.key}`)}
              </button>
            ))}
            <div className="pt-2 border-t border-border">
              <Button
                variant="premium"
                className="w-full"
                onClick={() => handleNavClick('#contact')}
              >
                {t('nav.reserve')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
