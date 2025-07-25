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
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ease-in-out
            ${i === index && fade ? 'opacity-100 scale-105 animate-kenburns' : 'opacity-0 scale-100'}
            sm:object-cover sm:w-full sm:h-full md:object-cover md:w-full md:h-full lg:object-cover lg:w-full lg:h-full
          `}
          style={{
            filter: 'brightness(1.15) saturate(1.1) blur(0.5px)',
            transition: 'opacity 0.6s, transform 6s',
          }}
        />
      ))}
      {/* Improved overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 md:from-black/50 md:via-black/30 md:to-black/60" />
    </div>
  );
}

// Add Ken Burns effect via Tailwind plugin or custom CSS
// Add this to your global CSS (e.g., index.css):
// .animate-kenburns {
//   animation: kenburns 12s ease-in-out infinite alternate;
// }
// @keyframes kenburns {
//   0% { transform: scale(1.05) translate(0, 0); }
//   100% { transform: scale(1.12) translate(-2%, -2%); }
// } 