import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faPinterestP,
  faInstagram,
  faYoutube,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';

const socialLinks = [
  { icon: faFacebookF, url: '#' },
  { icon: faPinterestP, url: '#' },
  { icon: faInstagram, url: '#' },
  { icon: faYoutube, url: '#' },
  { icon: faLinkedinIn, url: '#' },
];

export default function PortfolioCarousel({ items = [] }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const prev = () => setCurrent((current - 1 + items.length) % items.length);
  const next = () => setCurrent((current + 1) % items.length);
  const prevIdx = (current - 1 + items.length) % items.length;
  const nextIdx = (current + 1) % items.length;

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % items.length);
      }, 3000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, items.length]);

  return (
    <section className="relative pt-10 pb-16 bg-transparent flex flex-col items-center overflow-x-hidden">
      {/* Social Icons Vertical Bar - Fixed Position */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-50">
        {socialLinks.map((item, idx) => (
          <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-luxury shadow-lg hover:scale-110 transition-transform duration-300">
            <FontAwesomeIcon icon={item.icon} className="text-white text-xl" />
          </a>
        ))}
      </div>
      {/* Carousel */}
      <div className="relative flex items-center justify-center w-full max-w-5xl min-h-[420px] z-10">
        {/* Previous Image */}
        {items.length > 1 && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-44 h-60 rounded-2xl overflow-hidden opacity-50 blur-sm scale-90 shadow-lg transition-all duration-500" style={{zIndex: 1}}>
            <img src={items[prevIdx]?.image} alt="prev" className="w-full h-full object-cover" />
          </div>
        )}
        {/* Center Image (larger size) */}
        <div className="relative z-20 mx-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-gradient-luxury animate-pulse-glow flex items-center justify-center w-96 h-[28rem] bg-black">
          <img src={items[current]?.image} alt={items[current]?.title} className="w-full h-full object-cover brightness-110 contrast-110 saturate-110" />
        </div>
        {/* Next Image */}
        {items.length > 1 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-44 h-60 rounded-2xl overflow-hidden opacity-50 blur-sm scale-90 shadow-lg transition-all duration-500" style={{zIndex: 1}}>
            <img src={items[nextIdx]?.image} alt="next" className="w-full h-full object-cover" />
          </div>
        )}
        {/* Navigation Arrows */}
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-luxury shadow-lg text-white text-2xl hover:scale-110 transition-transform duration-300">
          &#60;
        </button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-luxury shadow-lg text-white text-2xl hover:scale-110 transition-transform duration-300">
          &#62;
        </button>
      </div>
      {/* Project Info Card */}
      <div className="bg-black/90 backdrop-blur-sm rounded-2xl px-8 py-8 shadow-xl w-full max-w-xl mx-auto text-center z-10 relative mt-8 border border-white/10">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide uppercase">
          {items[current]?.title}
        </h3>
        <p className="text-lg text-gray-300 mb-5">
          {items[current]?.description}
        </p>
        {/* Category label, now smaller, uppercase, gold, and spaced */}
        <div className="mb-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest gradient-text">
            {items[current]?.category}
          </span>
        </div>
        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-2">
          {items.map((_, idx) => (
            <span key={idx} className={`w-2 h-2 rounded-full ${idx === current ? 'bg-gradient-luxury shadow-lg' : 'bg-gray-600'} transition-all duration-300`}></span>
          ))}
        </div>
      </div>
    </section>
  );
} 