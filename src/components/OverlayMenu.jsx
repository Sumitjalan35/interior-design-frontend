import React from 'react';

const menuLinks = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Videos', to: '/videos' },
  { label: 'Media', to: '/media' },
  { label: 'Contact Us', to: '/contact' },
];

const socialLinks = [
  { icon: 'fab fa-instagram', url: 'https://www.instagram.com/beyond.blueprint/?igsh=cGd4ZTU1enJ3dDhy#' },
  { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/amannjalan/' },
];
export default function OverlayMenu({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm" style={{backgroundImage: `url('/assets/hero.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      {/* Overlay color */}
      <div className="absolute inset-0 bg-black/80" />
      {/* Close button */}
      <button
        className="absolute top-8 right-10 text-4xl text-[#bfa77a] hover:text-white transition-colors z-20"
        onClick={onClose}
        aria-label="Close menu"
      >
        &times;
      </button>
      {/* Logo and brand */}
      <div className="relative z-20 flex flex-col items-center pt-12 pb-8">
        <img src="/assets/slideshow/beyond_blueprint_Logo__7_-removebg-preview.png" alt="Logo" className="h-24 w-24 object-contain mb-2" />
        <div className="text-[#bfa77a] tracking-widest text-2xl font-serif font-semibold uppercase">BEYOND BLUEPRINT</div>
        <div className="text-[#bfa77a] text-xs tracking-widest font-light mt-1">DESIGN GROUP</div>
      </div>
      <div className="relative z-20 flex-1 flex flex-col md:flex-row max-w-6xl mx-auto w-full px-4 md:px-12 gap-12 md:gap-0">
        {/* Left: Menu links */}
        <div className="flex-1 flex flex-col justify-center items-start md:items-start md:pr-12 border-b md:border-b-0 md:border-r border-[#bfa77a]/30 pb-10 md:pb-0 md:mb-0">
          <nav className="space-y-7 w-full">
            {menuLinks.map(link => (
              <a
                key={link.label}
                href={link.to}
                className="block text-2xl md:text-3xl font-light text-[#bfa77a] hover:text-white transition-colors font-serif tracking-wide pl-2"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        {/* Right: Contact info */}
        <div className="flex-1 flex flex-col justify-center items-start md:items-end pl-0 md:pl-12 pt-10 md:pt-0">
          <div className="mb-8 w-full md:w-auto">
            <div className="text-[#bfa77a] text-lg font-semibold mb-4">CONTACT US</div>
            <div className="text-white/90 mb-4">
              <div className="font-bold">Address:</div>
              <div className="text-sm font-light">Deva road lucknow</div>
            </div>
            <div className="text-white/90 mb-4">
              <div className="font-bold">Phone No:</div>
              <div className="text-sm font-light">9648477743, 90444441424</div>
            </div>
            <div className="text-[#bfa77a] text-lg font-semibold mb-2 mt-6">EMAIL</div>
            <div className="text-white/90 text-sm font-light mb-6 space-y-1">
              <div>beyondblueprintdesign@gmail.com</div>
            </div>
            {/* Social icons */}
            <div className="flex space-x-4 mb-8 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-[#bfa77a]/20 flex items-center justify-center text-[#bfa77a] hover:bg-[#bfa77a] hover:text-black transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#bfa77a]/20 flex items-center justify-center text-[#bfa77a] hover:bg-[#bfa77a] hover:text-black transition-colors">
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#bfa77a]/20 flex items-center justify-center text-[#bfa77a] hover:bg-[#bfa77a] hover:text-black transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#bfa77a]/20 flex items-center justify-center text-[#bfa77a] hover:bg-[#bfa77a] hover:text-black transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#bfa77a]/20 flex items-center justify-center text-[#bfa77a] hover:bg-[#bfa77a] hover:text-black transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          {/* Footer */}
          <div className="text-[#bfa77a] text-xs mt-8 border-t border-[#bfa77a]/30 pt-4 w-full text-center md:text-right">
            © 2023 BEYOND BLUEPRINT Design Group. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
} 
