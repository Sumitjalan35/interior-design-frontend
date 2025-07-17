import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedText({ 
  text, 
  type = 'reveal', 
  speed = 100, 
  className = '',
  delay = 0,
  onComplete = null 
}) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    if (type === 'typewriter') {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else if (onComplete) {
        onComplete();
      }
    } else if (type === 'reveal') {
      setDisplayText(text);
      if (onComplete) onComplete();
    }
  }, [currentIndex, text, speed, type, isVisible, onComplete]);

  const baseClasses = `transition-all duration-1000 ${className}`;
  
  if (type === 'typewriter') {
    return (
      <span ref={elementRef} className={baseClasses}>
        {displayText}
        <span className="animate-pulse">|</span>
      </span>
    );
  }

  if (type === 'reveal') {
    return (
      <span 
        ref={elementRef}
        className={`${baseClasses} ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        {displayText}
      </span>
    );
  }

  return <span className={baseClasses}>{text}</span>;
}

export function AnimatedHeading({ 
  children, 
  level = 1, 
  className = '',
  animation = 'slide-up',
  delay = 0 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const Tag = `h${level}`;
  const animationClasses = {
    'slide-up': isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    'slide-left': isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8',
    'slide-right': isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
    'scale': isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
    'fade': isVisible ? 'opacity-100' : 'opacity-0'
  };

  return (
    <Tag
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${animationClasses[animation]} ${className}`}
    >
      {children}
    </Tag>
  );
}

export function AnimatedParagraph({ 
  children, 
  className = '',
  delay = 0,
  stagger = 0 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <p
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{ transitionDelay: `${stagger}ms` }}
    >
      {children}
    </p>
  );
} 