import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faCogs,
  faImages,
  faVideo,
  faNewspaper,
  faEnvelope,
  faPlus,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faPinterestP,
  faYoutube,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';

const menuItems = [
  { label: 'Home', to: '/', icon: faHome },
  { label: 'About', to: '/about', icon: faUser },
  { label: 'Services', to: '/services', icon: faCogs },
  { label: 'Portfolio', to: '/portfolio', icon: faImages },
  { label: 'Videos', to: '/videos', icon: faVideo },
  { label: 'Media', to: '/media', icon: faNewspaper },
  { label: 'Contact', to: '/contact', icon: faEnvelope },
];

const socialLinks = [
  { icon: faInstagram, url: 'https://www.instagram.com/beyond.blueprint/?igsh=cGd4ZTU1enJ3dDhy#', color: 'hover:bg-pink-600' },
  { icon: faLinkedinIn, url: 'https://www.linkedin.com/in/amannjalan/', color: 'hover:bg-blue-700' },
];

export function HamburgerButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 flex flex-col items-center justify-center group focus:outline-none"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <span
        className={`absolute w-8 h-1 bg-bronze-400 rounded transition-all duration-500 ease-in-out origin-center
          ${isOpen ? 'rotate-45 translate-y-0.5 bg-gold-400' : '-translate-y-2'}
        `}
      ></span>
      <span
        className={`absolute w-8 h-1 bg-bronze-400 rounded transition-all duration-500 ease-in-out origin-center
          ${isOpen ? 'opacity-0 scale-x-0' : ''}
        `}
      ></span>
      <span
        className={`absolute w-8 h-1 bg-bronze-400 rounded transition-all duration-500 ease-in-out origin-center
          ${isOpen ? '-rotate-45 -translate-y-0.5 bg-gold-400' : 'translate-y-2'}
        `}
      ></span>
    </button>
  );
}

export default function SlidingMenu({ isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowMenu(true);
      document.body.style.overflow = 'hidden';
    } else {
      // Delay unmount for animation
      setTimeout(() => setShowMenu(false), 600);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Animated background gradient
  const animatedBg = (
    <div className="absolute inset-0 z-0 animate-gradient-move bg-gradient-to-br from-charcoal-900 via-bronze-400/30 to-charcoal-800 bg-[length:400%_400%] opacity-90 blur-xl" />
  );

  if (!isOpen && !showMenu) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(13, 17, 23, 0.75)',
        transition: 'opacity 0.5s',
      }}
    >
      {/* Glassmorphism Panel */}
      <div className="relative w-full max-w-md mx-auto px-8 py-10 rounded-3xl glass-card border border-charcoal-700/50 shadow-2xl flex flex-col items-center animate-fade-in-up">
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-3xl text-bronze-400 hover:text-gold-400 transition-colors duration-200 focus:outline-none"
          onClick={onClose}
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {/* Logo */}
        <img src="/assets/slideshow/beyond_blueprint_Logo__7_-removebg-preview.png" alt="Logo" className="w-24 h-24 mx-auto mb-2 object-contain" />
        {/* Brand Name at the top of the menu */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-bronze-400 to-gold-400 flex items-center justify-center shadow-lg glass-effect">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-charcoal-950">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold tracking-tight gradient-text text-shadow-lg">Beyond Blueprint</span>
        </div>
        {/* Menu Items */}
        <nav className="flex flex-col gap-7 w-full">
          <Link to="/" onClick={onClose} className="menu-luxury flex items-center gap-4 text-cream-100 text-2xl hover:text-bronze-400 transition-colors duration-200">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <Link to="/about" onClick={onClose} className="menu-luxury flex items-center gap-4 text-cream-100 text-2xl hover:text-bronze-400 transition-colors duration-200">
            <FontAwesomeIcon icon={faUser} /> About
          </Link>
          <Link to="/services" onClick={onClose} className="menu-luxury flex items-center gap-4 text-cream-100 text-2xl hover:text-bronze-400 transition-colors duration-200">
            <FontAwesomeIcon icon={faCogs} /> Services
          </Link>
          <Link to="/portfolio" onClick={onClose} className="menu-luxury flex items-center gap-4 text-cream-100 text-2xl hover:text-bronze-400 transition-colors duration-200">
            <FontAwesomeIcon icon={faImages} /> Portfolio
          </Link>
          <Link to="/videos" onClick={onClose} className="menu-luxury flex items-center gap-4 text-cream-100 text-2xl hover:text-bronze-400 transition-colors duration-200">
            <FontAwesomeIcon icon={faVideo} /> Videos
          </Link>
          <Link to="/media" onClick={onClose} className="menu-luxury flex items-center gap-4 text-cream-100 text-2xl hover:text-bronze-400 transition-colors duration-200">
            <FontAwesomeIcon icon={faNewspaper} /> Media
          </Link>
          <Link to="/contactus" onClick={onClose} className="menu-luxury flex items-center gap-4 text-cream-100 text-2xl hover:text-bronze-400 transition-colors duration-200">
            <FontAwesomeIcon icon={faEnvelope} /> Contact
          </Link>
        </nav>
        {/* Removed floating action button as requested */}
      </div>
      {/* Extra: floating shapes for fun */}
      <div className="pointer-events-none fixed inset-0 z-40">
        <div className="absolute left-1/4 top-1/3 w-32 h-32 bg-bronze-400/10 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute right-1/4 bottom-1/4 w-24 h-24 bg-bronze-400/20 rounded-full blur-2xl animate-float" />
      </div>
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          animation: gradient-move 8s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(30px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 
