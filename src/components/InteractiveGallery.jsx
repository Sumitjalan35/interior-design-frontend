import React, { useState, useRef, useEffect } from 'react';

export default function InteractiveGallery({ 
  items = [], 
  columns = 3,
  className = '' 
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const lightboxRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setSelectedItem(null);
      }
    };

    if (isLightboxOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  const openLightbox = (item) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5'
  };

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
        {items.map((item, index) => (
          <GalleryItem
            key={index}
            item={item}
            index={index}
            onClick={() => openLightbox(item)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && selectedItem && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-[#bfa074] transition-colors"
            >
              ×
            </button>
            
            <div className="relative group">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                <p className="text-gray-200">{selectedItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function GalleryItem({ item, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-gray-200 text-sm mb-4">{item.description}</p>
          
          {/* Category Badge */}
          {item.category && (
            <span className="inline-block bg-[#bfa074] text-black px-3 py-1 rounded-full text-xs font-semibold w-fit">
              {item.category}
            </span>
          )}
        </div>
        
        {/* Hover Effect */}
        <div className="absolute inset-0 border-2 border-[#bfa074] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-[#bfa074] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
          <i className="fas fa-expand text-black"></i>
        </div>
      </div>
    </div>
  );
}

export function MasonryGallery({ items = [], className = '' }) {
  return (
    <div className={`columns-1 md:columns-2 lg:columns-3 gap-6 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="break-inside-avoid mb-6">
          <GalleryItem item={item} index={index} />
        </div>
      ))}
    </div>
  );
} 