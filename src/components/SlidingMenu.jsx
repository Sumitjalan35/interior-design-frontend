import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBookOpen,
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
  { label: 'Brand Story', to: '/brand-story', icon: faBookOpen },
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
        {/* Menu Items */}
        <nav className="flex flex-col gap-7 w-full">
          <Link to="/" onClick={onClose} className="menu-luxury flex items-center gap-4 text-cream-100 text-2xl hover:text-bronze-400 transition-colors duration-200">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <Link to="/brandstory" onClick={onClose} className="menu-luxury flex items-center gap-4 text-cream-100 text-2xl hover:text-bronze-400 transition-colors duration-200">
            <FontAwesomeIcon icon={faBookOpen} /> Brand Story
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
        {/* Floating Action Button */}
        <button className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-gradient-to-r from-bronze-500 to-gold-500 shadow-lg flex items-center justify-center text-3xl text-charcoal-950 hover:from-bronze-400 hover:to-gold-400 transition-all duration-200 animate-float hover:scale-110">
          <FontAwesomeIcon icon={faPlus} />
        </button>
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
