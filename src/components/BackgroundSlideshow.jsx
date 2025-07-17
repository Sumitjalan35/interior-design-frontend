import React, { useEffect, useState } from "react";
import { slideshowAPI } from "../services/api";

const defaultImages = [
  // Web-optimized Unsplash images (can be replaced with your own)
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
];

export default function BackgroundSlideshow({ 
  images = defaultImages, 
  interval = 5000 
}) {
  const [slideshowImages, setSlideshowImages] = useState(images);

  // Fetch slideshow images from API
  useEffect(() => {
    const fetchSlideshow = async () => {
      try {
        const response = await slideshowAPI.getAll(); // This now uses /api/slideshow
        if (response.data && response.data.length > 0) {
          setSlideshowImages(response.data);
        }
      } catch (err) {
        console.error('Error fetching slideshow:', err);
        // Keep using default images if API fails
      }
    };

    fetchSlideshow();
  }, []);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slideshowImages.length);
        setFade(true);
      }, 600); // match fade duration
    }, interval);
    return () => clearInterval(timer);
  }, [interval, slideshowImages.length]);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      {slideshowImages.map((img, i) => (
        <img
          key={img}
          src={img}
          alt="Portfolio background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ease-in-out
            ${i === index && fade ? 'opacity-100 scale-105 animate-kenburns' : 'opacity-0 scale-100'}
          `}
          style={{
            filter: 'brightness(1.15) saturate(1.1) blur(0.5px)', // Brighter, more vibrant, slight blur
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