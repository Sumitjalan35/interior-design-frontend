import React, { useState, useEffect } from 'react';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollDown(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const actions = [
    { icon: 'fas fa-phone', label: 'Call Us', action: () => window.open('tel:9648477743') },
    { icon: 'fas fa-envelope', label: 'Email', action: () => window.open('mailto:beyondblueprintdesign@gmail.com') },
    { icon: 'fas fa-comments', label: 'WhatsApp', action: () => window.open('https://wa.me/919648477743') },
    { icon: 'fas fa-arrow-up', label: 'Top', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  ];

  // Scroll down action
  const handleScrollDown = () => {
    const next = document.getElementById('after-hero-section');
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Scroll Down Button (only at top) */}
      {showScrollDown && (
        <button
          onClick={handleScrollDown}
          className="mb-4 w-14 h-14 rounded-full bg-gradient-to-br from-[#bfa074] to-[#d4af7a] flex items-center justify-center text-3xl text-white shadow-xl hover:scale-110 transition-all duration-300 animate-float"
          aria-label="Scroll Down"
        >
          <i className="fas fa-arrow-down"></i>
        </button>
      )}

      {/* Action Buttons */}
      {actions.map((action, index) => (
        <div
          key={action.label}
          className={`absolute bottom-0 right-0 transform transition-all duration-300 ease-out ${
            isOpen 
              ? `translate-y-${(index + 1) * -16} opacity-100 scale-100` 
              : 'translate-y-0 opacity-0 scale-75 pointer-events-none'
          }`}
          style={{ 
            transform: isOpen 
              ? `translateY(-${(index + 1) * 64}px)` 
              : 'translateY(0px)',
            transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
          }}
        >
          <button
            onClick={action.action}
            className="w-12 h-12 bg-[#bfa074] rounded-full flex items-center justify-center text-black shadow-lg hover:bg-[#a88a5a] transition-all duration-300 hover:scale-110 group"
            title={action.label}
          >
            <i className={action.icon}></i>
          </button>
          
          {/* Tooltip */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {action.label}
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-black border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        </div>
      ))}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-gradient-to-r from-[#bfa074] to-[#d4af7a] rounded-full flex items-center justify-center text-black shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        title="Quick Actions"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-plus'} text-xl transition-transform duration-300`}></i>
      </button>
    </div>
  );
} 