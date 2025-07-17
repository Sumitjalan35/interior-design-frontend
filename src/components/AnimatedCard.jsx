import React, { useState, useRef, useEffect } from 'react';

export default function AnimatedCard({ 
  children, 
  className = "", 
  hoverEffect = true, 
  parallax = false,
  delay = 0,
  ...props 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    if (!parallax) return;

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [parallax]);

  const baseClasses = `
    relative overflow-hidden rounded-xl bg-black/70 backdrop-blur-xl border border-gold-400/20 shadow-2xl
    transition-all duration-500 ease-out
    ${hoverEffect ? 'hover:shadow-2xl hover:shadow-bronze-400/20' : ''}
    ${className}
  `;

  const transformStyle = parallax && isHovered ? {
    transform: `
      perspective(1000px) 
      rotateX(${(mousePosition.y - 150) * 0.01}deg) 
      rotateY(${(mousePosition.x - 150) * 0.01}deg)
      scale(${hoverEffect ? 1.02 : 1})
    `,
    transition: 'transform 0.1s ease-out'
  } : {};

  return (
    <div
      ref={cardRef}
      className={baseClasses}
      style={transformStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bronze-400/5 via-transparent to-gold-400/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Shimmer effect */}
      {hoverEffect && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream-100/5 to-transparent -translate-x-full transition-transform duration-1000 ease-out hover:translate-x-full" />
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Border glow effect */}
      {hoverEffect && (
        <div className="absolute inset-0 rounded-xl border border-bronze-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </div>
  );
}

// Specialized card variants
export function ServiceCard({ icon, title, description, className = "" }) {
  return (
    <div className={`glass-card hover-lift p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 bg-black/70 ${className}`}>
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-bronze-400/15">
        <i className={`${icon} text-3xl text-bronze-400`}></i>
      </div>
      <h3 className="text-xl font-semibold text-cream-100 mb-2 tracking-wide uppercase">{title}</h3>
      <p className="text-cream-300">{description}</p>
    </div>
  );
}

export function ProjectCard({ image, title, category, className = "" }) {
  return (
    <AnimatedCard 
      className={`group cursor-pointer overflow-hidden bg-black/70 ${className}`}
      hoverEffect={true}
      parallax={true}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="text-bronze-400 text-sm font-medium mb-2">{category}</div>
          <h3 className="text-cream-100 text-xl font-semibold">{title}</h3>
        </div>
      </div>
    </AnimatedCard>
  );
}

export function TestimonialCard({ name, role, content, rating, avatar, className = "" }) {
  return (
    <AnimatedCard className={`bg-black/70 ${className}`}>
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-bronze-400/20 flex items-center justify-center">
          {avatar ? (
            <img 
              src={avatar} 
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <i className="fas fa-user text-bronze-400" style={{ display: avatar ? 'none' : 'flex' }}></i>
        </div>
        <div>
          <h4 className="text-cream-100 font-semibold">{name}</h4>
          <p className="text-bronze-400 text-sm">{role}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <i 
            key={i}
            className={`fas fa-star ${i < rating ? 'text-bronze-400' : 'text-charcoal-600'}`}
          />
        ))}
      </div>
      
      <p className="text-cream-300 italic leading-relaxed">"{content}"</p>
    </AnimatedCard>
  );
} 