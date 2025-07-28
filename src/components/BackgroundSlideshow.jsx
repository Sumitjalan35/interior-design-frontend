import React, { useEffect, useState } from "react";
import { slideshowAPI } from "../services/api";

export default function BackgroundSlideshow({ interval = 5000 }) {
  const [slideshowImages, setSlideshowImages] = useState([]);

  // Fetch slideshow images from API
  useEffect(() => {
    const fetchSlideshow = async () => {
      try {
        const response = await slideshowAPI.getAll();
        if (response.data && response.data.length > 0) {
          setSlideshowImages(response.data);
        } else {
          setSlideshowImages([]);
        }
      } catch (err) {
        setSlideshowImages([]);
      }
    };
    fetchSlideshow();
  }, []);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (slideshowImages.length === 0) return;
    let fadeTimeout;
    let slideTimeout;
    function nextSlide() {
      setFade(false);
      fadeTimeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % slideshowImages.length);
        setFade(true);
      }, 600); // match fade duration
    }
    slideTimeout = setInterval(nextSlide, interval);
    return () => {
      clearInterval(slideTimeout);
      clearTimeout(fadeTimeout);
    };
  }, [interval, slideshowImages.length]);

  if (slideshowImages.length === 0) {
    return null; // or a placeholder div if you want
  }

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      {slideshowImages.map((img, i) => (
        <img
          key={img}
          src={img}
          alt="Portfolio background"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-600 ease-in-out
            ${i === index && fade ? 'opacity-100 scale-105 animate-kenburns' : 'opacity-0 scale-100'}
          `}
          style={{
            filter: 'brightness(1.15) saturate(1.1) blur(0.5px)',
            transition: 'opacity 0.6s, transform 6s',
            objectPosition: 'center center'
          }}
        />
      ))}
      {/* Mobile-responsive overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 sm:from-black/60 sm:via-black/40 sm:to-black/70 md:from-black/50 md:via-black/30 md:to-black/60" />
      
      {/* Mobile-specific overlay for better text readability */}
      <div className="absolute inset-0 sm:hidden bg-gradient-to-t from-black/60 via-transparent to-black/40" />
    </div>
  );
}

