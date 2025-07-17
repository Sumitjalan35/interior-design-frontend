import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioAPI } from '../services/api';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch portfolio data from API
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await portfolioAPI.getAll();
        const projects = response.data.map(project => ({
          id: project.id,
          name: project.title,
          image: project.image,
          category: project.category,
          hasDetail: true
        }));
        setAllProjects(projects);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError('Failed to load portfolio data');
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const categories = ['All', ...Array.from(new Set(allProjects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <section className="min-h-screen bg-black pb-20 pt-8">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-gold-400 text-xl">Loading portfolio...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-black pb-20 pt-8">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-red-400 text-xl">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black pb-20 pt-8">
      {/* Logo and subtitle */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <img src="/assets/slideshow/beyond_blueprint_Logo__7_-removebg-preview.png" alt="Logo" className="h-28 w-28 object-contain mb-2" />
        <div className="text-gold-400 tracking-widest text-2xl font-playfair font-semibold uppercase mb-2">BEYOND BLUEPRINT</div>
        <div className="text-gold-400 text-xs tracking-widest font-light mb-6">DESIGN GROUP</div>
        <div className="text-gold-400 text-lg font-medium mb-2">Architecture | Interiors | Interior Styling | Furniture | Landscape</div>
      </div>
      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-montserrat text-sm font-semibold transition-all duration-300 border border-gold-400/30 hover:bg-gold-400/10 ${selectedCategory === cat ? 'bg-gold-400/20 text-gold-400 border-gold-400' : 'text-cream-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Portfolio grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group glass-card hover-lift rounded-xl overflow-hidden shadow-lg border border-gold-400/20 hover:border-gold-400/60 transition-all duration-300 flex flex-col items-center cursor-pointer"
              onClick={() => { 
                if (project.hasDetail) {
                  // Navigate to project detail page
                  window.location.href = `/project/${project.id}`;
                } else {
                  // Open lightbox for other projects
                  setLightboxIndex(allProjects.findIndex(p => p.name === project.name)); 
                  setLightboxOpen(true); 
                }
              }}
              style={{ perspective: 1000 }}
              whileHover={{ scale: 1.04, rotateY: 4, boxShadow: '0 8px 32px 0 rgba(234, 179, 8, 0.18)' }}
            >
              <div className="overflow-hidden w-full aspect-square flex items-center justify-center bg-[#222]">
                <img
                  src={project.image}
                  alt={project.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="py-6 text-center">
                <div className="text-gold-400 text-xl font-playfair font-medium tracking-wide">{project.name}</div>
                <div className="text-xs text-cream-300 mt-1 uppercase tracking-widest">{project.category}</div>
                {project.hasDetail && (
                  <div className="text-bronze-400 text-xs mt-2 flex items-center justify-center gap-1">
                    <i className="fas fa-info-circle"></i>
                    View Details
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={allProjects.map(p => ({ src: p.image, alt: p.name }))}
        render={{
          slide: ({ slide }) => (
            <img src={slide.src} alt={slide.alt} className="w-full h-full object-contain" />
          )
        }}
      />
    </section>
  );
}
