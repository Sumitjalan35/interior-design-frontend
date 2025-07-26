import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedCard from './AnimatedCard';
import { portfolioAPI } from '../services/api';

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 projects initially

  const categories = [
    { id: 'all', name: 'All Projects', icon: 'fas fa-th' },
    { id: 'residential', name: 'Residential', icon: 'fas fa-home' },
    { id: 'commercial', name: 'Commercial', icon: 'fas fa-building' },
    { id: 'luxury', name: 'Luxury', icon: 'fas fa-crown' },
    { id: 'modern', name: 'Modern', icon: 'fas fa-cube' }
  ];

  // Fetch portfolio data from backend
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const response = await portfolioAPI.getAll();
        setPortfolioData(response.data);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  // Transform backend data to match frontend structure
  const projects = portfolioData
    .sort((a, b) => (a.sequence || 0) - (b.sequence || 0))
    .map(item => ({
      id: item.id,
      title: item.title,
      category: item.category?.toLowerCase() || 'residential',
      image: item.image || item.mainImage,
      description: item.description,
      area: item.area,
      duration: item.duration
    }));

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  // Handle load more
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  // Get projects to display
  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < filteredProjects.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('portfolio-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  if (loading) {
    return (
      <section id="portfolio-section" className="py-20 bg-charcoal-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-6xl md:text-7xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#bfa074] to-[#fffbe6] drop-shadow-lg mb-2 font-serif uppercase">
              PORTFOLIO
            </h2>
            <div className="text-[#bfa074] text-lg font-medium mb-8">Loading portfolio...</div>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bronze-400"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio-section" className="py-20 bg-charcoal-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-6xl md:text-7xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#bfa074] to-[#fffbe6] drop-shadow-lg mb-2 font-serif uppercase">
              PORTFOLIO
            </h2>
            <div className="text-red-400 text-lg font-medium mb-8">Error loading portfolio: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio-section" className="py-20 bg-charcoal-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-bronze-400/5 via-transparent to-gold-400/5" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-bronze-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gold-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2
            className="text-6xl md:text-7xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#bfa074] to-[#fffbe6] drop-shadow-lg mb-2 font-serif uppercase"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.15em', textShadow: '0 4px 24px #bfa07499' }}
          >
            PORTFOLIO
          </h2>
          <div className="text-[#bfa074] text-xs tracking-widest font-light mb-6">LUXURY INTERIOR DESIGN</div>
          <div className="text-[#bfa074] text-lg font-medium mb-2 max-w-2xl mx-auto text-center">Discover our curated collection of exceptional interior design projects that showcase our commitment to excellence and innovation.</div>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 ease-out delay-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-3 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-bronze-400 to-gold-400 text-charcoal-900 shadow-lg shadow-bronze-400/25'
                  : 'bg-charcoal-800/50 text-cream-300 border border-charcoal-700 hover:border-bronze-400/50 hover:bg-charcoal-700/50'
              }`}
            >
              <i className={`${category.icon} text-sm`} />
              <span className="font-medium">{category.name}</span>
              {activeCategory === category.id && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-bronze-400 to-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ease-out delay-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {displayedProjects.map((project, index) => (
            <Link key={project.id} to={`/project/${project.id}`}>
              <AnimatedCard
                className="group cursor-pointer overflow-hidden"
                hoverEffect={true}
                parallax={true}
                delay={index * 100}
              >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transition duration-500"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Project Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-bronze-400/20 text-bronze-400 text-xs font-medium rounded-full border border-bronze-400/30">
                      {project.category}
                    </span>
                    <span className="text-cream-300/70 text-xs">
                      {project.area} • {project.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-cream-100 mb-2">{project.title}</h3>
                  <p className="text-cream-300 text-sm leading-relaxed mb-4">{project.description}</p>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-bronze-400 text-sm font-medium">View Details</span>
                    <i className="fas fa-arrow-right text-bronze-400 text-sm transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-charcoal-900/80 backdrop-blur-sm text-cream-100 text-xs font-medium rounded-full border border-charcoal-700/50">
                  {project.area}
                </div>
              </div>
            </AnimatedCard>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreProjects && (
          <div className={`text-center mt-12 transition-all duration-1000 ease-out delay-600 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <button
              onClick={handleLoadMore}
              className="group relative px-8 py-4 border-2 border-bronze-400/50 text-bronze-400 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:border-bronze-400 hover:bg-bronze-400/10 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span>Load More Projects</span>
                <i className="fas fa-chevron-down text-sm transition-transform duration-300 group-hover:translate-y-1" />
              </span>
              <div className="absolute inset-0 bg-bronze-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <div className="text-cream-300/70 text-sm mt-4">
              Showing {displayedProjects.length} of {filteredProjects.length} projects
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className={`text-center mt-16 transition-all duration-1000 ease-out delay-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-cream-100 mb-4">
              Ready to Transform Your Space?
            </h3>
            <p className="text-cream-300 mb-8">
              Let's collaborate to create a space that reflects your vision and exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="group relative px-8 py-4 bg-gradient-to-r from-bronze-400 to-gold-400 text-charcoal-900 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bronze-400/25"
              >
                <span className="relative z-10">Start Your Project</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-bronze-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              
              <Link
                to="/portfolio"
                className="group relative px-8 py-4 border-2 border-bronze-400/50 text-bronze-400 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:border-bronze-400 hover:bg-bronze-400/10 hover:scale-105"
              >
                <span className="relative z-10">View All Projects</span>
                <div className="absolute inset-0 bg-bronze-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
