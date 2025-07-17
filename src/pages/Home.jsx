import React from 'react';
import HeroSection from '../components/HeroSection';
import ContactForm from '../components/ContactForm';
import AnimatedCard, { ServiceCard, TestimonialCard } from '../components/AnimatedCard';
import InteractiveGallery from '../components/InteractiveGallery';
import AnimatedHeading, { AnimatedParagraph } from '../components/AnimatedText';
import ParallaxSection, { ParallaxElement } from '../components/ParallaxSection';
import PortfolioSection from '../components/PortfolioSection';
import { useState } from 'react';

const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    content: '“BEYOND BLUEPRINT transformed our living space into a stunning, functional home. Their attention to detail is unmatched.”',
  },
  {
    name: 'Michael Chen',
    role: 'Business Owner',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    content: '“The team delivered beyond our expectations. Our office space now reflects our brand perfectly.”',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Property Developer',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5,
    content: '“Professional, creative, and reliable. BEYOND BLUEPRINT is our go-to for all interior design needs.”',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Villa Owner',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    rating: 4,
    content: '“Luxury, comfort, and style—delivered on time and on budget. Highly recommended!”',
  },
  {
    name: 'Priya Mehta',
    role: 'Apartment Owner',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    rating: 5,
    content: '“The design process was seamless and the results are breathtaking. Thank you, BEYOND BLUEPRINT!”',
  },
];

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const visible = 3;
  const total = TESTIMONIALS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section className="py-24 bg-black flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gold-400 tracking-wide" style={{fontFamily: 'Playfair Display, serif'}}>Client Testimonials</h2>
      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center">
        {/* Left Arrow */}
        <button onClick={prev} className="absolute left-0 z-10 p-3 rounded-full bg-white/20 hover:bg-gold-400/80 text-gold-400 hover:text-charcoal-950 shadow-lg transition-all duration-200 -translate-y-1/2 top-1/2">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        {/* Cards */}
        <div className="flex gap-8 w-full justify-center">
          {Array.from({length: visible}).map((_, i) => {
            const idx = (current + i) % total;
            const t = TESTIMONIALS[idx];
            return (
              <div key={t.name} className="glass-card rounded-2xl p-8 flex-1 min-w-[300px] max-w-sm shadow-xl border border-gold-400/30 backdrop-blur-xl bg-white/5 transition-transform duration-500 hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-gold-400 shadow" />
                  <div>
                    <div className="font-bold text-lg text-cream-100" style={{fontFamily: 'Playfair Display, serif'}}>{t.name}</div>
                    <div className="text-gold-400 text-sm" style={{fontFamily: 'Montserrat, sans-serif'}}>{t.role}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className={`w-5 h-5 ${j < t.rating ? 'text-gold-400' : 'text-charcoal-700'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                  ))}
                </div>
                <blockquote className="italic text-cream-200 mb-2" style={{fontFamily: 'Montserrat, sans-serif'}}>{t.content}</blockquote>
              </div>
            );
          })}
        </div>
        {/* Right Arrow */}
        <button onClick={next} className="absolute right-0 z-10 p-3 rounded-full bg-white/20 hover:bg-gold-400/80 text-gold-400 hover:text-charcoal-950 shadow-lg transition-all duration-200 -translate-y-1/2 top-1/2">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </section>
  );
}

const Home = () => {
  const services = [
    {
      icon: 'fas fa-home',
      title: 'Interior Design',
      description: 'Complete interior design solutions tailored to your lifestyle and preferences.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=600&fit=crop'
    },
    {
      icon: 'fas fa-paint-brush',
      title: 'Space Planning',
      description: 'Optimize your space with intelligent layout and functional design.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Lighting Design',
      description: 'Create the perfect ambiance with strategic lighting solutions.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=600&fit=crop'
    },
    {
      icon: 'fas fa-couch',
      title: 'Furniture Selection',
      description: 'Curated furniture pieces that complement your design vision.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=600&fit=crop'
    },
    {
      icon: 'fas fa-palette',
      title: 'Color Consultation',
      description: 'Expert color schemes that enhance your space and mood.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop'
    },
    {
      icon: 'fas fa-tools',
      title: 'Project Management',
      description: 'End-to-end project coordination ensuring timely delivery.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=600&fit=crop'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      content: 'BEYOND BLUEPRINT transformed our living space into a stunning, functional home. Their attention to detail is unmatched.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      content: 'The team delivered beyond our expectations. Our office space now reflects our brand perfectly.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Property Developer',
      content: 'Professional, creative, and reliable. BEYOND BLUEPRINT is our go-to for all interior design needs.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const featuredProjects = [
    {
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop',
      title: 'Modern Luxury Villa',
      description: 'Contemporary design meets comfort in this stunning residential project.',
      category: 'Residential'
    },
    {
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      title: 'Corporate Headquarters',
      description: 'Professional workspace designed for productivity and collaboration.',
      category: 'Commercial'
    },
    {
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      title: 'Boutique Hotel Lobby',
      description: 'Elegant hospitality design that creates memorable guest experiences.',
      category: 'Hospitality'
    },
    {
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      title: 'Urban Apartment',
      description: 'Smart space utilization for modern city living.',
      category: 'Residential'
    },
    {
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      title: 'Restaurant Interior',
      description: 'Atmospheric dining space that enhances the culinary experience.',
      category: 'Hospitality'
    },
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      title: 'Retail Store Design',
      description: 'Customer-focused retail environment that drives sales.',
      category: 'Commercial'
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Portfolio Section */}
      <PortfolioSection heading="PORTFOLIO" />

      {/* Services Section */}
      <section className="min-h-screen bg-charcoal-900 pb-20 relative">
        {/* Services Background Image */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&fit=crop"
            alt="Services Background"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'blur(8px) brightness(0.4)' }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="flex flex-col items-center pt-12 pb-6">
          <h2
            className="text-6xl md:text-7xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#bfa074] to-[#fffbe6] drop-shadow-lg mb-2 font-serif uppercase"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.15em', textShadow: '0 4px 24px #bfa07499' }}
          >
            SERVICES
          </h2>
          <div className="text-[#bfa074] text-xs tracking-widest font-light mb-6">LUXURY INTERIOR DESIGN</div>
          <div className="text-[#bfa074] text-lg font-medium mb-2 max-w-2xl text-center">Discover our range of bespoke interior design services, tailored to elevate your space with timeless elegance and modern luxury.</div>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4">
          {services.map((service, idx) => (
            <div key={service.title} className="bg-charcoal-900/80 border border-bronze-400/30 rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105">
              <img
                src={service.image}
                alt={service.title}
                className="w-full aspect-square object-cover object-center transition duration-500"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-bronze-400 mb-2 tracking-wide uppercase" style={{ fontFamily: 'Playfair Display, serif' }}>{service.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full flex flex-col items-center justify-center py-24 bg-black">
        <div className="glass-card border border-gold-400/40 shadow-2xl rounded-2xl px-10 py-12 max-w-3xl mx-auto flex flex-col items-center text-center relative bg-black/70">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-gold-400 via-bronze-400 to-gold-400 rounded-full mb-6" />
          <h3 className="text-3xl md:text-4xl font-playfair font-bold text-gold-400 mb-4 drop-shadow-lg">Get in Touch for a Free Consultation</h3>
          <p className="text-lg text-cream-200 mb-8 max-w-xl">Let’s create something beautiful together. Reach out for a complimentary consultation and discover how we can transform your space with luxury and elegance.</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a href="/contact" className="bg-gradient-to-r from-gold-400 to-bronze-400 text-charcoal-900 font-montserrat font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-gold-400/40 transition-all duration-300 flex items-center justify-center gap-2 text-lg">
              <i className="fas fa-envelope"></i> Get Started Today
            </a>
            <a href="/portfolio" className="border-2 border-gold-400 text-gold-400 font-montserrat font-semibold px-8 py-3 rounded-full bg-transparent hover:bg-gold-400 hover:text-charcoal-900 transition-all duration-300 flex items-center justify-center gap-2 text-lg">
              <i className="fas fa-arrow-right"></i> View Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ParallaxSection className="py-20 bg-charcoal-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedHeading level={2} className="text-4xl md:text-5xl font-bold text-cream-100 mb-6" animation="slide-up">
              Let's <span className="gradient-text">Connect</span>
            </AnimatedHeading>
            <AnimatedParagraph className="text-xl text-cream-300" delay={200}>
              Ready to start your design journey? Fill out the form below and we'll get back to you.
            </AnimatedParagraph>
          </div>
          <ContactForm large={true} />
        </div>
      </ParallaxSection>
    </div>
  );
};

export default Home;
