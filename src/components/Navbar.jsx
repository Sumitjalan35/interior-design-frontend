import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SlidingMenu from './SlidingMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-charcoal-900/95 backdrop-blur-xl border-b border-charcoal-700/50 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Brand area */}
            <Link to="/" className="flex flex-row items-center justify-center gap-3 px-2 py-1 select-none group" style={{ minWidth: 180 }}>
              <img src="/assets/slideshow/beyond_blueprint_Logo__7_-removebg-preview.png" alt="Logo" className="h-20 w-20 object-contain group-hover:scale-105 transition-transform duration-200" style={{marginRight: 4}} />
              <div className="flex flex-col items-start justify-center">
                <span style={{ fontFamily: 'Georgia Pro, Georgia, serif', fontWeight: 800, fontSize: '1.25rem', color: '#bfa074', lineHeight: 1.1, letterSpacing: 1 }}>
                  BEYOND
                </span>
                <span style={{ fontFamily: 'Georgia Pro, Georgia, serif', fontWeight: 800, fontSize: '1.25rem', color: '#bfa074', lineHeight: 1.1, letterSpacing: 1 }}>
                  BLUEPRINT
              </span>
              </div>
            </Link>
            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-gradient-to-b from-transparent via-charcoal-600/50 to-transparent mx-8"></div>

            {/* Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg glass-effect hover:bg-gold-400/20 transition-all duration-300 group border-2 border-gold-400 shadow-gold-400/40 shadow-lg"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-gold-400 shadow-gold-400/80 shadow-md transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-gold-400 shadow-gold-400/80 shadow-md transition-all duration-300 mt-1 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-gold-400 shadow-gold-400/80 shadow-md transition-all duration-300 mt-1 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <SlidingMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;
