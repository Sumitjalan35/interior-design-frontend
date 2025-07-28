import React, { useState, useEffect, useRef } from 'react';
import { slideshowAPI } from '../services/api';

// Set your logo and brand name here
const BRAND_LOGO = '/assets/logo.png'; // Update with your logo path
const BRAND_NAME = 'BEYOND BLUEPRINT';

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [slides, setSlides] = useState([]);
  const [lastFetch, setLastFetch] = useState(0);
  const timeoutRef = useRef(null);

  // Fetch slideshow images from API
  const fetchSlideshow = async () => {
    try {
      const response = await slideshowAPI.getAll();
      if (response.data && response.data.length > 0) {
        // Filter out invalid image URLs and ensure they're accessible
        const validSlides = response.data.filter(src => {
          return src && (src.startsWith('/assets/') || src.startsWith('/uploads/') || src.startsWith('http'));
        });
        setSlides(validSlides);
        setLastFetch(Date.now());
      } else {
        setSlides([]);
      }
    } catch (err) {
      setSlides([]);
    }
  };

  useEffect(() => {
    fetchSlideshow();
    const refreshInterval = setInterval(fetchSlideshow, 30000);
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    setFade(false);
    const fadeTimeout = setTimeout(() => setFade(true), 200);
    const slideTimeout = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2500);
    return () => {
      clearTimeout(slideTimeout);
      clearTimeout(fadeTimeout);
    };
  }, [current, slides.length]);

  if (slides.length === 0) {
    return null; // or a placeholder div if you want
  }

  return (
    <section className="relative flex flex-col items-center justify-start min-h-screen w-full overflow-hidden">
      {/* Dark gradient vignette overlay - mobile responsive */}
      <div className="pointer-events-none absolute inset-0 z-20" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(24,24,27,0.8) 100%), linear-gradient(to top, rgba(24,24,27,0.8) 0%, rgba(0,0,0,0) 30%), linear-gradient(to bottom, rgba(24,24,27,0.6) 0%, rgba(0,0,0,0) 20%), linear-gradient(to left, rgba(24,24,27,0.6) 0%, rgba(0,0,0,0) 20%), linear-gradient(to right, rgba(24,24,27,0.6) 0%, rgba(0,0,0,0) 20%)',
        mixBlendMode: 'multiply',
      }} />
      
      {/* Mobile-specific overlay for better readability */}
      <div className="pointer-events-none absolute inset-0 z-15 sm:hidden bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      
      {/* Slideshow images - mobile responsive */}
      {slides.map((src, idx) => (
        <img
          key={`${src}-${lastFetch}`}
          src={src}
          alt="Luxury Interior Work"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'} kenburns`}
          style={{ 
            filter: 'contrast(1.08) saturate(1.1) brightness(1.05) drop-shadow(0 2px 8px rgba(0,0,0,0.08))',
            objectPosition: 'center center'
          }}
          loading="eager"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ))}
      
      {/* Mobile-optimized content overlay */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Brand Logo - mobile responsive */}
          <div className="mb-8 sm:mb-12">
            {BRAND_LOGO && (
              <img 
                src={BRAND_LOGO} 
                alt={BRAND_NAME} 
                className="h-16 sm:h-20 md:h-24 mx-auto mb-4 opacity-90"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
              />
            )}
          </div>
          
          {/* Brand Name - mobile responsive */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-cream-100 mb-4 sm:mb-6 tracking-wider uppercase" 
              style={{ 
                fontFamily: 'Playfair Display, serif',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                letterSpacing: '0.1em'
              }}>
            {BRAND_NAME}
          </h1>
          
          {/* Tagline - mobile responsive */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-cream-200 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed" 
             style={{ 
               fontFamily: 'Montserrat, sans-serif',
               textShadow: '0 2px 8px rgba(0,0,0,0.6)'
             }}>
            Luxury Interior Design & Space Planning
          </p>
          
          {/* CTA Buttons - mobile responsive */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <a href="/portfolio" 
               className="bg-gradient-to-r from-bronze-400 to-gold-400 text-charcoal-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-bronze-400/40 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
              <i className="fas fa-eye"></i> View Portfolio
            </a>
            <a href="/contact" 
               className="border-2 border-bronze-400 text-bronze-400 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-transparent hover:bg-bronze-400 hover:text-charcoal-900 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
              <i className="fas fa-envelope"></i> Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
