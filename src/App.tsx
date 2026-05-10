import React from 'react';
import { Download, Clock, ArrowLeft, Check, Sun, Moon, Globe, ChevronDown, Menu, X } from 'lucide-react';
import { FaGithub, FaApple, FaWindows } from 'react-icons/fa';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

/* ─── SEO COMPONENT ─── */
const SEO = ({ isDark }: { isDark: boolean }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const baseUrl = "https://minipet.vercel.app";
  
  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "SoftwareApplication",
    "name": "MiniPet",
    "operatingSystem": "Windows, macOS",
    "applicationCategory": "ProductivityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": t('seo.description'),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "ratingCount": "150"
    }
  };

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{t('seo.title')}</title>
      <meta name="description" content={t('seo.description')} />
      <meta name="keywords" content={t('seo.keywords')} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={`${baseUrl}${location.pathname}`} />
      
      {/* Performance: Preconnect to Font Servers */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800;900&display=swap" rel="stylesheet" media="all" />

      {/* Multilingual SEO (Hreflang) */}
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/?lang=en`} />
      <link rel="alternate" hrefLang="vi" href={`${baseUrl}/?lang=vi`} />
      <link rel="alternate" hrefLang="zh" href={`${baseUrl}/?lang=zh`} />
      <link rel="alternate" hrefLang="fr" href={`${baseUrl}/?lang=fr`} />
      <link rel="alternate" hrefLang="it" href={`${baseUrl}/?lang=it`} />
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      
      {/* Mobile Experience */}
      <meta name="theme-color" content={isDark ? '#0f172a' : '#e8eeff'} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Performance: Preload Critical Assets */}
      <link rel="preload" href="/cat/spritesheet.png" as="image" />
      <link rel="preload" href="/icons/icon.png" as="image" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:title" content={t('seo.title')} />
      <meta property="og:description" content={t('seo.description')} />
      <meta property="og:image" content={`${baseUrl}/icons/icon.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={baseUrl} />
      <meta name="twitter:title" content={t('seo.title')} />
      <meta name="twitter:description" content={t('seo.description')} />
      <meta name="twitter:image" content={`${baseUrl}/icons/icon.png`} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* Global Performance Styles */}
      <style>{`
        section {
          content-visibility: auto;
          contain-intrinsic-size: 1px 500px;
        }
        section#hero {
          content-visibility: visible;
        }
        .hero-orb {
          will-change: transform, opacity;
        }
        img {
          content-visibility: auto;
          aspect-ratio: attr(width) / attr(height);
          height: auto; /* Fallback for layout */
        }
        .cat-sprite-frame {
          will-change: background-position;
        }
      `}</style>
    </Helmet>
  );
};

/* ─── CONTAINER WRAPPER ─── */
const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

/* ─── NAVBAR ─── */
function Navbar({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [langOpen, setLangOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (l: string) => {
    setMenuOpen(false);
    if (l === 'Custom Pets') {
      navigate('/custom-pet');
    } else {
      const id = l === 'Features' ? 'features' : l.toLowerCase();
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'vi', label: 'Tiếng Việt', short: 'VI' },
    { code: 'zh', label: '中文', short: 'ZH' },
    { code: 'it', label: 'Italiano', short: 'IT' },
    { code: 'fr', label: 'Français', short: 'FR' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <header className="fixed top-3 left-0 right-0 z-50 pointer-events-none" ref={menuRef}>
      <Container>
        <div className="flex items-center w-full bg-[var(--nav-bg)] backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-sm rounded-2xl px-3 sm:px-5 py-2 pointer-events-auto transition-colors duration-300">
          {/* Logo */}
          <Link
            to="/"
            aria-label="Back to home"
            title="MiniPet Home"
            className="flex items-center gap-2 mr-auto cursor-pointer bg-transparent border-none p-0 group no-underline"
          >
            <div className="w-7 h-7 rounded-lg bg-[#111827] dark:bg-white flex items-center justify-center transition-transform group-hover:scale-105 overflow-hidden border border-white/10 shadow-sm">
              <img 
                src="/icons/icon.png" 
                alt="MiniPet Logo" 
                className="w-full h-full object-cover pixel-art" 
                loading="eager"
                width="28"
                height="28"
                /* @ts-ignore */
                fetchPriority="high"
              />
            </div>
            <span className="text-[13px] sm:text-[13.5px] font-extrabold text-[#111827] dark:text-white tracking-tight">MiniPet</span>
          </Link>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-7 mx-6">
            <a
              href="#features"
              onClick={(e) => { e.preventDefault(); handleNavClick('Features'); }}
              className="text-[13px] font-bold text-gray-600 dark:text-gray-300 hover:text-[#111827] dark:hover:text-white transition-colors no-underline"
            >
              {t('nav.features')}
            </a>
            <Link
              to="/custom-pet"
              className="text-[13px] font-bold text-gray-600 dark:text-gray-300 hover:text-[#111827] dark:hover:text-white transition-colors no-underline"
            >
              {t('nav.docs')}
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Change language"
                className="flex items-center gap-1.5 bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 px-2 sm:px-3 py-1.5 rounded-xl border border-gray-200/50 dark:border-gray-700/50 transition-all cursor-pointer group"
              >
                <Globe size={13} className="text-gray-500 group-hover:text-indigo-500 transition-colors" />
                <span className="text-[10px] sm:text-[11px] font-black text-gray-700 dark:text-gray-300">{currentLang.short}</span>
                <ChevronDown size={10} className={`text-gray-500 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl p-2 z-[60]">
                  {languages.map((lng) => (
                    <a
                      key={lng.code}
                      href={`?lang=${lng.code}`}
                      onClick={(e) => { e.preventDefault(); changeLanguage(lng.code); }}
                      aria-label={`Switch to ${lng.label}`}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-bold transition-colors no-underline ${i18n.language === lng.code
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#111827] dark:hover:text-white'
                        }`}
                    >
                      <span>{lng.label}</span>
                      {i18n.language === lng.code && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-none cursor-pointer"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden w-8 h-8 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-none cursor-pointer"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== '/') {
                  navigate('/');
                  setTimeout(() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' }), 100);
                } else {
                  document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-label="Download MiniPet"
              className="btn-dark !rounded-xl !py-1.5 !px-3 sm:!px-4 !text-[11px] sm:!text-[13px] pointer-events-auto flex items-center gap-1.5 no-underline"
            >
              <Download size={14} className="sm:hidden" />
              <span className="hidden xs:inline">{t('nav.download')}</span>
              <span className="xs:hidden">Get</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl p-4 pointer-events-auto mx-4 z-[60]">
            <div className="flex flex-col gap-2">
              <a
                href="#features"
                onClick={(e) => { e.preventDefault(); setMenuOpen(false); handleNavClick('Features'); }}
                className="w-full text-left px-5 py-4 rounded-2xl text-[14px] font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#111827] dark:hover:text-white transition-all no-underline"
              >
                {t('nav.features')}
              </a>
              <Link
                to="/custom-pet"
                onClick={() => setMenuOpen(false)}
                className="w-full text-left px-5 py-4 rounded-2xl text-[14px] font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#111827] dark:hover:text-white transition-all no-underline"
              >
                {t('nav.docs')}
              </Link>
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-2 mx-5" />
              <a
                href="https://github.com/helloquocbao/mini-pet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our GitHub repository"
                className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-[14px] font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#111827] dark:hover:text-white transition-all no-underline"
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

/* ─── HERO ─── */
function Hero() {
  const { t } = useTranslation();
  return (
    <section id="hero" className="pt-20 pb-10 md:pt-32 md:pb-20 overflow-hidden relative">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
          {/* Left copy */}
          <div className="z-10 order-2 md:order-1 text-center md:text-left">
            <h1 className="text-[#111827] dark:text-white font-[900] leading-[1.08] tracking-tight mb-4 text-[36px] sm:text-[46px] lg:text-[54px]">
              {t('hero.title1')}<br />
              {t('hero.title2')}<br />
              {t('hero.title3')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-[14px] sm:text-[15px] leading-relaxed mb-6 max-w-sm mx-auto md:mx-0">
              {t('hero.desc')}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-5">
              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-dark !rounded-2xl !py-2.5 !px-6 !text-[13.5px] no-underline"
              >
                <Download size={16} /> {t('hero.getFree')}
              </a>
              <a
                href="https://github.com/helloquocbao/mini-pet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View MiniPet source code on GitHub"
                className="btn-ghost !rounded-2xl !py-2.5 !px-6 !text-[13.5px]"
              >
                <FaGithub size={16} /> {t('hero.source')}
              </a>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-[12px] font-semibold text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-green-500" /> {t('hero.noAds')}
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-green-500" /> {t('hero.noAccount')}
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-green-500" /> {t('hero.privacy')}
              </span>
            </div>
          </div>

          {/* Right — pet image */}
          <div className="relative flex justify-center items-center order-1 md:order-2 py-4">
            {/* Outer ambient glow (Moved to back) */}
            <div className="absolute inset-[-30%] bg-gradient-to-tr from-blue-300/30 via-purple-300/20 to-pink-300/30 blur-[100px] rounded-full z-0" />
            
            {/* Circular gradient orb */}
            <div className="hero-orb z-10">
              {/* Animated Cat Sprite Frame - TOP LAYER */}
              <div 
                className="cat-sprite-frame relative z-20 transition-transform duration-500 hover:scale-110" 
                style={{ willChange: 'transform' }} 
                role="img"
                aria-label="Animated pixel art cat companion"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── FEATURES ─── */
function Features() {
  const { t } = useTranslation();
  return (
    <section id="features" className="py-20 bg-gray-50/50 dark:bg-black/5 relative">
      <Container>
        {/* Section header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-[900] text-[#111827] dark:text-white tracking-tight leading-tight mb-3">
            {t('features.badge')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-[15px] sm:text-[16px] max-w-md mx-auto leading-relaxed">
            {t('features.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Top 2 Cards: Main Features */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {/* ── Desktop Companion ── */}
            <div className="card overflow-hidden flex flex-col">
              <div
                className="flex-1 bg-gradient-to-br from-[#dde8ff] to-[#cdd8f8] flex items-center justify-center overflow-hidden"
                style={{ minHeight: 160 }}
              >
                <img
                  src="/feature-companion.png"
                  alt="Live Desktop Companion featuring a cute pet"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="240"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-[17px] font-extrabold text-[#111827] dark:text-white mb-1.5">{t('features.companion.title')}</h3>
                <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                  {t('features.companion.desc')}
                </p>
              </div>
            </div>

            {/* ── Pomodoro Timer ── */}
            <div className="card overflow-hidden flex flex-col">
              {/* Image fills remaining space */}
              <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-rose-50 to-orange-50" style={{ minHeight: 160 }}>
                <img
                  src="/card-pomodoro.png"
                  alt="Pomodoro Timer interface with a focused pet"
                  className="w-full h-full object-cover pixel-art"
                  style={{ mixBlendMode: 'multiply' }}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="240"
                />
                {/* Timer pill */}
                <div className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                  <Clock size={9} /> 25:00
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[9px] font-semibold text-gray-600 px-2 py-0.5 rounded-full shadow-sm">Focus mode</div>
              </div>
              {/* Text always at bottom */}
              <div className="p-4 md:p-6 border-t border-gray-100/80">
                <h3 className="text-[15px] font-extrabold text-[#111827] mb-1.5">{t('features.pomodoro.title')}</h3>
                <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                  {t('features.pomodoro.desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Side Card: Multi-Pet Support */}
          <div className="md:col-span-1 card overflow-hidden flex flex-col group">
            <div className="flex-1 relative bg-[#f1f4ff] dark:bg-indigo-900/10 overflow-hidden min-h-[220px]">
              <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-110">
                <img
                  src="/card-context.png"
                  alt="Multiple MiniPet characters interacting on a desktop"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  width="300"
                  height="300"
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-[16px] font-extrabold text-[#111827] dark:text-white mb-1.5">{t('features.multi.title')}</h3>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                {t('features.multi.desc')}
              </p>
            </div>
          </div>

          {/* Bottom 2 Cards: Interaction & PetDex */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* ── File Eating System ── */}
            <div className="card overflow-hidden flex items-center bg-amber-50/30 dark:bg-amber-900/5 group">
              <div className="w-1/3 h-full relative overflow-hidden flex items-center justify-center">
                <img
                  src="/card-overlay.png"
                  alt="Interactive file eating system illustration"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  width="200"
                  height="200"
                />
              </div>
              <div className="p-6 w-2/3">
                <h3 className="text-[17px] font-extrabold text-[#111827] dark:text-white mb-1.5">{t('features.eating.title')}</h3>
                <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('features.eating.desc')}
                </p>
              </div>
            </div>

            {/* ── PetDex & Custom Pets ── */}
            <div className="card overflow-hidden flex items-center bg-indigo-50/30 dark:bg-indigo-900/5 group">
              <div className="w-1/3 h-full relative overflow-hidden flex items-center justify-center">
                <img
                  src="/card-petdex.png"
                  alt="PetDex library showing various custom pets"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  width="200"
                  height="200"
                />
              </div>
              <div className="p-6 w-2/3">
                <h3 className="text-[17px] font-extrabold text-[#111827] dark:text-white mb-1.5">{t('features.custom.title')}</h3>
                <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('features.custom.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── DOWNLOAD SECTION ─── */
function DownloadSection() {
  const { t } = useTranslation();
  const downloads = [
    {
      platform: 'macOS',
      icon: <FaApple size={28} />,
      version: 'v1.0.0',
      ext: '.dmg',
      link: 'https://github.com/helloquocbao/mini-pet/releases/download/v1.0.0/MiniPet-v1.0.0.dmg',
      desc: t('download.macDesc'),
      color: 'bg-gray-100 dark:bg-gray-800'
    },
    {
      platform: 'Windows',
      icon: <FaWindows size={28} />,
      version: 'v1.0.0',
      ext: '.exe',
      link: '#',
      desc: t('download.winExeDesc'),
      color: 'bg-blue-50 dark:bg-blue-900/20',
      disabled: true
    },
    {
      platform: 'Windows',
      icon: <FaWindows size={28} />,
      version: 'v1.0.0',
      ext: '.zip',
      link: 'https://github.com/helloquocbao/mini-pet/releases/download/v1.0.0/MiniPet-v1.0.0-Portable.zip',
      desc: t('download.winZipDesc'),
      color: 'bg-indigo-50 dark:bg-indigo-900/20'
    }
  ];

  return (
    <section id="download" className="py-16 md:py-24 bg-white/30 dark:bg-black/10">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-[900] text-[#111827] dark:text-white tracking-tight mb-3">
            {t('download.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-[15px] sm:text-[16px] max-w-md mx-auto">
            {t('download.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {downloads.map((d, idx) => (
            <div key={idx} className="card p-8 flex flex-col items-center text-center group">
              <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}>
                <div className="text-[#111827] dark:text-white">
                  {d.icon}
                </div>
              </div>
              <h3 className="text-[22px] font-black text-[#111827] dark:text-white mb-1">{d.platform}</h3>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-6 sm:whitespace-nowrap">{d.desc}</p>

              <div className="w-full pt-6 border-t border-gray-100 dark:border-gray-800">
                <a
                  href={d.disabled ? "#download" : d.link}
                  aria-label={d.disabled ? `Coming Soon: MiniPet for ${d.platform} (${d.ext})` : `Download MiniPet for ${d.platform} (${d.ext})`}
                  className={`btn-dark w-full !justify-center !py-3 !rounded-2xl flex items-center gap-2 group/btn no-underline ${d.disabled ? 'opacity-40 grayscale select-none' : ''}`}
                  onClick={(e) => { if (d.disabled) e.preventDefault(); }}
                >
                  <Download size={18} className={d.disabled ? '' : 'group-hover/btn:translate-y-0.5 transition-transform'} />
                  {d.disabled ? 'Coming Soon' : `${t('download.btn')} ${d.ext}`}
                </a>
                <div className="mt-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Version {d.version}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* macOS Troubleshooting */}
        <div className="mt-16 max-w-3xl mx-auto bg-indigo-50/50 dark:bg-indigo-900/10 rounded-3xl p-6 md:p-8 border border-indigo-100/50 dark:border-indigo-500/20 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
              <FaApple size={20} />
            </div>
            <div>
              <h3 className="text-[17px] font-black text-[#111827] dark:text-white mb-2">
                {t('download.troubleshooting.macTitle')}
              </h3>
              <p className="text-[13.5px] text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                {t('download.troubleshooting.macStep1')}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-[13px] font-bold text-gray-600 dark:text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">1</div>
                  <span>{t('download.troubleshooting.macStep2')}</span>
                </div>
                <div className="flex items-start gap-3 text-[13px] font-bold text-gray-600 dark:text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">2</div>
                  <span>{t('download.troubleshooting.macStep3')}</span>
                </div>
              </div>

              {/* Terminal Backup Option */}
              <div className="mt-6 pt-6 border-t border-indigo-100 dark:border-indigo-900/30">
                <p className="text-[12px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  {t('download.troubleshooting.macTerminalTitle')}
                </p>
                <div className="bg-[#1a1b26] rounded-2xl p-5 border border-white/5 shadow-2xl shadow-indigo-500/10 group relative">
                  {/* Terminal Header Dots */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="font-mono text-[12.5px] leading-relaxed">
                    <div className="text-slate-400 mb-2"># {t('download.troubleshooting.macTerminalStep').split(':')[0]}:</div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">$</span>
                      <code className="text-indigo-200 break-all">
                        {t('download.troubleshooting.macTerminalStep').split(':')[1]?.trim() || t('download.troubleshooting.macTerminalStep')}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="pt-12 pb-10">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-200/60 pt-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#111827] dark:bg-white flex items-center justify-center overflow-hidden">
              <img src="/icons/icon.png" alt="MiniPet Logo Small" className="w-full h-full object-cover pixel-art" width="32" height="32" loading="lazy" decoding="async" />
            </div>
            <span className="text-[15px] font-black text-[#111827] dark:text-white tracking-tight">MiniPet</span>
          </div>

          {/* Social icons */}
          <div className="flex gap-6">
            <a
              href="https://github.com/helloquocbao/mini-pet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our GitHub repository"
              className="text-gray-400 hover:text-[#111827] dark:hover:text-white transition-all hover:scale-110"
            >
              <FaGithub size={20} />
            </a>
          </div>

          {/* Disclaimer */}
          <div className="max-w-2xl text-center sm:text-left">
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              <span className="font-bold text-gray-600 dark:text-gray-300">{t('footer.disclaimer')}</span> {t('footer.disclaimer_text')}
            </p>
          </div>

          {/* Copyright */}
          <p className="text-[12px] text-gray-500 dark:text-gray-400 font-semibold flex-shrink-0">
            © 2026 MiniPet — {t('footer.copyright')}
          </p>
        </div>
      </Container>
    </footer>
  );
}

/* ─── CUSTOM PET PAGE ─── */
function CustomPetPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <Container className="max-w-4xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-8 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          {t('docs.back')}
        </button>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300">
          <div className="mb-10">
            <h1 className="text-3xl md:text-5xl font-[900] text-[#111827] dark:text-white mb-4 tracking-tight">{t('docs.title')}</h1>
            <div className="h-1.5 w-20 bg-indigo-500 rounded-full mb-6" />
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              {t('docs.desc')}
            </p>
          </div>

          <div className="space-y-16">
            {/* 1. Cấu trúc thư mục */}
            <section>
              <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-5 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20">1</span>
                {t('docs.section1')}
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50">
                <p className="text-gray-600 dark:text-gray-400 mb-4">{t('docs.section1_desc')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="text-pink-600 dark:text-pink-400 font-mono font-bold mb-1">pet.json</div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Configuration</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="text-indigo-600 dark:text-indigo-400 font-mono font-bold mb-1">spritesheet.webp</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Animations</div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Quy định Spritesheet */}
            <section>
              <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-5 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20">2</span>
                {t('docs.section2')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('docs.section2_desc')}</p>

              <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100/80 dark:bg-gray-800/80 text-[#111827] dark:text-white text-xs uppercase tracking-widest">
                      <th className="p-5 font-bold w-20 text-center">{t('docs.table.row')}</th>
                      <th className="p-5 font-bold">{t('docs.table.action')}</th>
                      <th className="p-5 font-bold hidden sm:table-cell">{t('docs.table.desc')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-300 text-[14px]">
                    {[
                      { row: 0, action: t('docs.table.idle'), label: 'Idle' },
                      { row: 1, action: t('docs.table.walkR'), label: 'Walk Phải' },
                      { row: 2, action: t('docs.table.walkL'), label: 'Walk Trái' },
                      { row: 3, action: t('docs.table.greet'), label: 'Chào' },
                      { row: 4, action: t('docs.table.action_spec'), label: 'Action' },
                      { row: 5, action: t('docs.table.failed'), label: 'Failed' },
                      { row: 6, action: t('docs.table.waiting'), label: 'Waiting' },
                      { row: 7, action: t('docs.table.running'), label: 'Running' },
                      { row: 8, action: t('docs.table.review'), label: 'Review' },
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-200/40 dark:border-gray-700/40 hover:bg-white dark:hover:bg-gray-800/50 transition-colors">
                        <td className="p-5 font-mono text-center font-bold text-indigo-600 dark:text-indigo-400 bg-gray-100/30 dark:bg-gray-800/20">{row.row}</td>
                        <td className="p-5 font-bold text-[#111827] dark:text-white">{row.label}</td>
                        <td className="p-5 hidden sm:table-cell text-gray-600 dark:text-gray-400">{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. Cấu hình pet.json */}
            <section>
              <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-5 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20">3</span>
                {t('docs.section3')}
              </h2>
              <div className="bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl p-7 border border-indigo-100 dark:border-indigo-900/30">
                <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
                  {t('docs.section3_desc')}
                </p>
                <div className="bg-white dark:bg-gray-900/50 rounded-xl p-5 border border-indigo-200/50 dark:border-indigo-500/20 shadow-sm">
                  <p className="text-indigo-900 dark:text-indigo-300 text-sm leading-relaxed flex gap-3">
                    <Check size={18} className="flex-shrink-0 text-indigo-500" />
                    <span>
                      {t('docs.section3_note')}
                    </span>
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Ví dụ thực tế: Black Wukong */}
            <section className="pt-12 border-t border-gray-100 dark:border-gray-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-[900] text-[#111827] dark:text-white flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-base font-bold shadow-lg shadow-orange-500/20">4</span>
                    {t('docs.section4')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{t('docs.section4_desc')}</p>
                </div>
                <span className="w-fit px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[12px] font-black uppercase tracking-widest rounded-xl border border-orange-200/50 dark:border-orange-500/20">
                  Reference Asset
                </span>
              </div>

              <div className="space-y-10">
                {/* Spritesheet Preview - Full Width & Scrollable */}
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-6 md:p-8 border border-gray-200/60 dark:border-gray-700/50 group">
                    <div className="bg-white dark:bg-black/40 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-inner">
                      <div className="max-h-[500px] overflow-y-auto overflow-x-auto p-4 custom-scrollbar">
                        <img
                          src="/cat/spritesheet.png"
                          alt="Lyra Spritesheet Example"
                          className="min-w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                          width="1856"
                          height="2262"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between px-2">
                      <span className="text-[14px] font-bold text-gray-400 uppercase tracking-widest">{t('docs.spritesheet_sample')}</span>
                      <span className="text-[12px] text-gray-400">{t('docs.scroll_note')}</span>
                    </div>
                  </div>
                </div>

                {/* JSON Code Preview - Professional Code Block */}
                <div className="space-y-4">
                  <div className="text-[13px] font-bold text-gray-400 uppercase tracking-widest px-1">{t('docs.json_config')}</div>
                  <div className="bg-[#0d0d0d] rounded-3xl p-1 shadow-2xl border border-gray-800/50">
                    <div className="bg-[#1a1a1a] rounded-[22px] overflow-hidden">
                      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-lg shadow-[#ff5f56]/20" />
                          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-lg shadow-[#ffbd2e]/20" />
                          <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-lg shadow-[#27c93f]/20" />
                        </div>
                        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">pet.json</div>
                      </div>
                      <div className="p-8 font-mono text-[14px] leading-relaxed overflow-x-auto">
                        <pre className="text-indigo-300">
                          {`{
  "id": "lyra-cat",
  "displayName": "Lyra",
  "description": "A cute white fluffy cat companion.",
  "spritesheetPath": "spritesheet.png"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ─── APP ─── */
function AppContent() {
  const [isDark, setIsDark] = React.useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors duration-300">
      {/* Animated background blobs */}
      <div className="blob-container">
        <div className="blob blob-1 opacity-40 dark:opacity-20" />
        <div className="blob blob-2 opacity-40 dark:opacity-20" />
        <div className="blob blob-3 opacity-40 dark:opacity-20" />
      </div>

      <SEO isDark={isDark} />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <Features />
              <DownloadSection />
            </main>
          }
        />
        <Route path="/custom-pet" element={<CustomPetPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
