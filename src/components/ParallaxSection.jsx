import React, { useEffect, useRef, useState } from 'react';

export default function ParallaxSection({ 
  children, 
  backgroundImage = null,
  speed = 0.5,
  className = '',
  overlay = true 
}) {
  const sectionRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        setScrollY(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Parallax Background */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: `translateY(${scrollY * speed}px)`,
            willChange: 'transform'
          }}
        />
      )}
      
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/40" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}

export function ParallaxElement({ 
  children, 
  speed = 0.3,
  direction = 'up',
  className = '' 
}) {
  const elementRef = useRef(null);
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const elementTop = rect.top + scrolled;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate how much the element has been scrolled into view
        const scrollProgress = (scrolled - elementTop + windowHeight) / (windowHeight + elementHeight);
        
        if (scrollProgress > 0 && scrollProgress < 1) {
          const translateValue = scrollProgress * 100 * speed;
          setTransform(direction === 'up' ? -translateValue : translateValue);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div
      ref={elementRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `translateY(${transform}px)`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}

export function FloatingElement({ 
  children, 
  className = '',
  animation = 'float',
  duration = 3 
}) {
  const animationClasses = {
    'float': 'animate-float',
    'bounce': 'animate-bounce',
    'pulse': 'animate-pulse',
    'spin': 'animate-spin'
  };

  return (
    <div
      className={`${animationClasses[animation]} ${className}`}
      style={{ animationDuration: `${duration}s` }}
    >
      {children}
    </div>
  );
} 