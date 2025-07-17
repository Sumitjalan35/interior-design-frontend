import React, { useState, useEffect, useRef } from 'react';
import { slideshowAPI } from '../services/api';

// Set your logo and brand name here
const BRAND_LOGO = '/assets/logo.png'; // Update with your logo path
const BRAND_NAME = 'BEYOND BLUEPRINT';

// Fallback slides in case API fails
const FALLBACK_SLIDES = [
  '/assets/slideshow/1-2.jpg',
  '/assets/slideshow/3-18 (2).jpg',
  '/assets/slideshow/4-21 (1).jpg',
  '/assets/slideshow/1.2-1.png',
  '/assets/slideshow/2-18.png',
  '/assets/slideshow/2.2.png',
  '/assets/slideshow/3-3 (1).png',
  '/assets/slideshow/3-7.png',
  '/assets/slideshow/3.1.png',
  '/assets/slideshow/6-14.png',
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [lastFetch, setLastFetch] = useState(0);
  const timeoutRef = useRef(null);

  // Fetch slideshow images from API
  const fetchSlideshow = async () => {
    try {
      const response = await slideshowAPI.getAll(); // This now uses /api/slideshow
      if (response.data && response.data.length > 0) {
        // Filter out invalid image URLs and ensure they're accessible
        const validSlides = response.data.filter(src => {
          // Check if the image path is valid
          return src && (src.startsWith('/assets/') || src.startsWith('/uploads/') || src.startsWith('http'));
        });
        setSlides(validSlides.length > 0 ? validSlides : FALLBACK_SLIDES);
        setLastFetch(Date.now());
      }
    } catch (err) {
      console.error('Error fetching slideshow:', err);
      // Keep using fallback slides if API fails
    }
  };

  useEffect(() => {
    fetchSlideshow();
    
    // Set up periodic refresh every 30 seconds to catch admin updates
    const refreshInterval = setInterval(fetchSlideshow, 30000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    setFade(false);
    const fadeTimeout = setTimeout(() => setFade(true), 200);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2500);
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(fadeTimeout);
    };
  }, [current, slides.length]);

  return (
    <section className="relative flex flex-col items-center justify-start min-h-screen w-screen overflow-hidden">
      {/* Dark gradient vignette overlay */}
      <div className="pointer-events-none absolute inset-0 z-20" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(24,24,27,0.7) 100%), linear-gradient(to top, rgba(24,24,27,0.7) 0%, rgba(0,0,0,0) 20%), linear-gradient(to bottom, rgba(24,24,27,0.7) 0%, rgba(0,0,0,0) 20%), linear-gradient(to left, rgba(24,24,27,0.7) 0%, rgba(0,0,0,0) 20%), linear-gradient(to right, rgba(24,24,27,0.7) 0%, rgba(0,0,0,0) 20%)',
        mixBlendMode: 'multiply',
      }} />
      {/* Slideshow images */}
      {slides.map((src, idx) => (
        <img
          key={`${src}-${lastFetch}`} // Force re-render when data updates
          src={src}
          alt="Luxury Interior Work"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'} kenburns`}
          style={{ filter: 'contrast(1.08) saturate(1.1) brightness(1.05) drop-shadow(0 2px 8px rgba(0,0,0,0.08))' }}
          loading="eager"
          onError={(e) => {
            // Optionally remove broken images from the slideshow
            e.target.style.display = 'none';
          }}
        />
      ))}
    </section>
  );
}
