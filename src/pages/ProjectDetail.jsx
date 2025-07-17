import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AnimatedCard from '../components/AnimatedCard';
import { apiFetch } from '../services/api';

// Function to fetch project data from API
async function fetchProjectData(id) {
  try {
    const response = await apiFetch(`/portfolio/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch project data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching project data:', error);
    return null;
  }
}

// Fallback data in case API fails
const fallbackProjectData = {
  1: {
    id: 1,
    title: 'Dr Aftab Ahmad',
    mainImage: '/assets/Dr_Aftab_Ahmad/1-34.png',
    images: [
      '/assets/Dr_Aftab_Ahmad/1-34.png',
      '/assets/Dr_Aftab_Ahmad/2-26.png',
      '/assets/Dr_Aftab_Ahmad/3-20.png',
      '/assets/Dr_Aftab_Ahmad/4-21.png',
      '/assets/Dr_Aftab_Ahmad/5-17.png'
    ],
    area: '1000 sq ft',
    description: 'Elegant residential project for Dr. Aftab Ahmad',
    longDescription: 'A sophisticated residential design that combines modern aesthetics with functional living spaces.',
    budget: '₹15,00,000',
    duration: '3 months',
    category: 'residential'
  },
  2: {
    id: 2,
    title: 'Mr Amit Agarwal Showroom',
    mainImage: '/assets/Mr_Amit_Agarwal_Showroom/IMG-20240918-WA0001.jpg',
    images: [
      '/assets/Mr_Amit_Agarwal_Showroom/IMG-20240918-WA0001.jpg',
      '/assets/Mr_Amit_Agarwal_Showroom/IMG-20240918-WA0002.jpg',
      '/assets/Mr_Amit_Agarwal_Showroom/IMG-20240918-WA0002 (1).jpg'
    ],
    area: '2000 sq ft',
    description: 'Luxury showroom design for Mr. Amit Agarwal',
    longDescription: 'A modern showroom with premium finishes and innovative lighting.',
    budget: '₹25,00,000',
    duration: '4 months',
    category: 'commercial'
  },
  3: {
    id: 3,
    title: 'Mr Shashank Khetan Residence',
    mainImage: '/assets/Mr_Shashank_Khetan_Residance/Screenshot 2025-07-02 205820.png',
    images: [
      '/assets/Mr_Shashank_Khetan_Residance/Screenshot 2025-07-02 205820.png',
      '/assets/Mr_Shashank_Khetan_Residance/Screenshot 2025-07-02 205847.png',
      '/assets/Mr_Shashank_Khetan_Residance/Screenshot 2025-07-02 205912.png'
    ],
    area: '1500 sq ft',
    description: 'Luxury residence for Mr. Shashank Khetan',
    longDescription: 'A blend of luxury and comfort for a modern family.',
    budget: '₹18,00,000',
    duration: '3.5 months',
    category: 'luxury'
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      setError(null);
      
      try {
        // Try to fetch from API first
        const apiProject = await fetchProjectData(id);
        if (apiProject) {
          setProject(apiProject);
        } else {
          // Fallback to static data if API fails
          setProject(fallbackProjectData[id]);
        }
      } catch (err) {
        console.error('Error loading project:', err);
        setError(err.message);
        // Fallback to static data
        setProject(fallbackProjectData[id]);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  useEffect(() => {
    if (project) {
      setIsVisible(true);
    }
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bronze-400 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-cream-100">Loading Project...</h1>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cream-100 mb-4">Project Not Found</h1>
          {error && <p className="text-red-400 mb-4">{error}</p>}
          <Link to="/portfolio" className="text-bronze-400 hover:text-gold-400">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-900">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <img 
          src={project.mainImage} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Soft vignette: top, bottom, left, right borders only */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>
        
        

        {/* Project Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className={`transition-all duration-1000 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-bronze-400/20 text-bronze-400 text-sm font-medium rounded-full border border-bronze-400/30">
                {project.category}
              </span>
              <span className="text-cream-300/70 text-sm">
                {project.area} • {project.duration}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-cream-100 mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
              {project.title}
            </h1>
            <p className="text-xl text-cream-300 max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className={`transition-all duration-1000 ease-out delay-200 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <h2 className="text-3xl font-bold text-cream-100 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
                  Project Overview
                </h2>
                <p className="text-cream-300 text-lg leading-relaxed mb-8">
                  {project.longDescription || project.description}
                </p>

                {/* Image Gallery */}
                {project.images && project.images.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-cream-100 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
                      Project Gallery
                    </h3>
                    
                    {/* Main Image */}
                    <div className="mb-6">
                      <img 
                        src={project.images[selectedImage] || project.mainImage} 
                        alt={`${project.title} - Image ${selectedImage + 1}`}
                        className="w-full h-96 md:h-[500px] object-cover rounded-2xl"
                      />
                    </div>
                    
                    {/* Thumbnail Grid */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {project.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                            selectedImage === index 
                              ? 'ring-2 ring-bronze-400 scale-105' 
                              : 'hover:scale-105'
                          }`}
                        >
                          <img 
                            src={image} 
                            alt={`${project.title} - Thumbnail ${index + 1}`}
                            className="w-full h-20 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className={`transition-all duration-1000 ease-out delay-400 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                {/* Project Stats */}
                <div className="bg-charcoal-800/50 rounded-2xl p-6 border border-charcoal-700/50 mb-8">
                  <h3 className="text-xl font-bold text-cream-100 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    {project.location && (
                      <div>
                        <span className="text-cream-300/70 text-sm">Location</span>
                        <p className="text-cream-100 font-medium">{project.location}</p>
                      </div>
                    )}
                    {project.area && (
                      <div>
                        <span className="text-cream-300/70 text-sm">Area</span>
                        <p className="text-cream-100 font-medium">{project.area}</p>
                      </div>
                    )}
                    {project.duration && (
                      <div>
                        <span className="text-cream-300/70 text-sm">Duration</span>
                        <p className="text-cream-100 font-medium">{project.duration}</p>
                      </div>
                    )}
                    {project.budget && (
                      <div>
                        <span className="text-cream-300/70 text-sm">Budget</span>
                        <p className="text-cream-100 font-medium">{project.budget}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <div className="bg-charcoal-800/50 rounded-2xl p-6 border border-charcoal-700/50 mb-8">
                    <h3 className="text-xl font-bold text-cream-100 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-cream-300">
                          <i className="fas fa-check text-bronze-400 text-sm"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Testimonials */}
                {project.testimonials && project.testimonials.length > 0 && (
                  <div className="bg-charcoal-800/50 rounded-2xl p-6 border border-charcoal-700/50">
                    <h3 className="text-xl font-bold text-cream-100 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
                      Client Feedback
                    </h3>
                    {project.testimonials.map((testimonial, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fas fa-star text-sm ${i < testimonial.rating ? 'text-bronze-400' : 'text-charcoal-600'}`}></i>
                          ))}
                        </div>
                        <p className="text-cream-300 text-sm italic mb-2">"{testimonial.content}"</p>
                        <p className="text-bronze-400 text-sm font-medium">{testimonial.name}</p>
                        <p className="text-cream-300/70 text-xs">{testimonial.role}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal-800/30">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className={`transition-all duration-1000 ease-out delay-600 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-cream-100 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
              Ready to Start Your Project?
            </h2>
            <p className="text-cream-300 text-lg mb-8">
              Let's create something extraordinary together. Contact us to discuss your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-bronze-400 to-gold-400 text-charcoal-900 font-semibold rounded-full hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/portfolio"
                className="px-8 py-4 border-2 border-bronze-400/50 text-bronze-400 font-semibold rounded-full hover:border-bronze-400 hover:bg-bronze-400/10 transition-all duration-300"
              >
                View More Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
