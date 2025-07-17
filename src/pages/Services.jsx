import React, { useState, useEffect } from 'react';
import { servicesAPI } from '../services/api';

export default function Services() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch services data from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAll();
        setDomains(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services data');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="bg-black min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-gold-400 text-xl">Loading services...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-black min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-red-400 text-xl">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black min-h-screen">
      {/* Hero Section */}
      <div id="banner" className="relative min-h-[60vh] flex flex-col items-center justify-center text-center bg-black" style={{backgroundImage: "url('/assets/services-hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex flex-col items-center pt-20 pb-12">
          <img src="/assets/slideshow/beyond_blueprint_Logo__7_-removebg-preview.png" alt="Logo" className="h-24 w-24 object-contain mb-2" />
          <div className="text-[#bfa074] tracking-widest text-2xl font-serif font-semibold uppercase mb-2">BEYOND BLUEPRINT</div>
          <div className="text-[#bfa074] text-xs tracking-widest font-light mb-6">DESIGN GROUP</div>
          <h1 className="text-6xl md:text-7xl font-light text-[#bfa074] mb-4 tracking-wider">SERVICES</h1>
          <p className="text-2xl md:text-3xl text-white font-light mb-4">A leading designer of ultra-luxury estate homes</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {domains.map(domain => (
              <a key={domain.id} href={`#${domain.id}`} className="px-6 py-2 rounded-full border border-[#bfa074]/40 text-[#bfa074] font-medium hover:bg-[#bfa074] hover:text-black transition-all duration-300 text-lg">{domain.title}</a>
            ))}
          </div>
        </div>
      </div>
      {/* Domain Sections */}
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col gap-24">
        {domains.map((domain, idx) => (
          <div
            key={domain.id}
            id={domain.id}
            className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Text */}
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-light text-[#bfa074] mb-4 tracking-wider border-b border-[#bfa074]/30 pb-2">{domain.title}</h2>
              <p className="text-white/90 text-lg leading-relaxed whitespace-pre-line">{domain.description}</p>
            </div>
            {/* Image */}
            <div className="flex-1 flex justify-center items-center">
              <div className="overflow-hidden rounded-2xl shadow-2xl border-4 border-[#bfa074]/30 w-full max-w-xl aspect-video bg-[#222]">
                <img src={domain.image} alt={domain.title} className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
