import React, { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import AnimatedCard from './AnimatedCard';

export default function ContactForm({ large = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById('contact-form');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await contactAPI.submit(formData);
      
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
      } else {
        setSubmitStatus('error');
        console.error('Contact form error:', response.data.message);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className={large ? "py-16 bg-gradient-to-b from-charcoal-900 to-charcoal-800 relative overflow-hidden" : "py-8 bg-gradient-to-b from-charcoal-900 to-charcoal-800 relative overflow-hidden"}>
      {/* Subtle blurred background for depth */}
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="bg" className="w-full h-full object-cover object-center blur-2xl opacity-20" />
        <div className="absolute inset-0 bg-charcoal-900/80" />
      </div>
      <div className={large ? "container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center pb-10" : "container mx-auto px-2 sm:px-4 lg:px-6 relative z-10 flex flex-col items-center pb-4"}>
        <AnimatedCard className={large ? `max-w-3xl w-full mx-auto p-10 md:p-14 bg-charcoal-900/60 border border-bronze-400/20 shadow-2xl backdrop-blur-xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}` : `max-w-2xl w-full mx-auto p-4 md:p-6 bg-charcoal-900/60 border border-bronze-400/20 shadow-2xl backdrop-blur-xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Heading */}
          <div className={large ? "text-center mb-8" : "text-center mb-4"}>
            <h2 className={large ? "text-4xl md:text-5xl font-bold text-cream-100 mb-2 tracking-wide" : "text-2xl md:text-3xl font-bold text-cream-100 mb-1 tracking-wide"}>
              Let's Create <span className="text-bronze-400">Together</span>
            </h2>
            <div className={large ? "mx-auto w-16 h-1 bg-gradient-to-r from-bronze-400 to-gold-400 rounded-full mb-4" : "mx-auto w-12 h-1 bg-gradient-to-r from-bronze-400 to-gold-400 rounded-full mb-2"} />
            <p className={large ? "text-lg text-cream-300 max-w-xl mx-auto leading-relaxed" : "text-base text-cream-300 max-w-xl mx-auto leading-relaxed"}>
              Ready to transform your space? Share your vision and let's bring your dream interior to life.
            </p>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className={large ? "grid grid-cols-1 md:grid-cols-2 gap-6 mb-10" : "grid grid-cols-1 md:grid-cols-2 gap-3 mb-4"}>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
              placeholder="Your name *" 
              className={large ? "col-span-1 bg-charcoal-800/60 border border-bronze-400/40 rounded-lg px-4 py-3 text-cream-100 placeholder-bronze-400 shadow-inner focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all" : "col-span-1 bg-charcoal-800/60 border border-bronze-400/40 rounded-lg px-3 py-2 text-cream-100 placeholder-bronze-400 shadow-inner focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 text-sm transition-all"} 
            />
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              required 
              placeholder="Email *" 
              className={large ? "col-span-1 bg-charcoal-800/60 border border-bronze-400/40 rounded-lg px-4 py-3 text-cream-100 placeholder-bronze-400 shadow-inner focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all" : "col-span-1 bg-charcoal-800/60 border border-bronze-400/40 rounded-lg px-3 py-2 text-cream-100 placeholder-bronze-400 shadow-inner focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 text-sm transition-all"} 
            />
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange} 
              placeholder="Phone number" 
              className={large ? "col-span-1 bg-charcoal-800/60 border border-bronze-400/40 rounded-lg px-4 py-3 text-cream-100 placeholder-bronze-400 shadow-inner focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all" : "col-span-1 bg-charcoal-800/60 border border-bronze-400/40 rounded-lg px-3 py-2 text-cream-100 placeholder-bronze-400 shadow-inner focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 text-sm transition-all"} 
            />
            <select 
              name="service" 
              value={formData.service} 
              onChange={handleInputChange} 
              className={large ? "col-span-1 bg-charcoal-800/60 border border-bronze-400/40 rounded-lg px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all" : "col-span-1 bg-charcoal-800/60 border border-bronze-400/40 rounded-lg px-3 py-2 text-cream-100 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 text-sm transition-all"}
            >
              <option value="">Select Service</option>
              <option value="residential">Residential Design</option>
              <option value="commercial">Commercial Spaces</option>
              <option value="kitchen-bath">Kitchen & Bath</option>
              <option value="furniture">Furniture Selection</option>
              <option value="consultation">Color Consultation</option>
            </select>
            <select 
              name="budget" 
              value={formData.budget} 
              onChange={handleInputChange} 
              className={large ? "col-span-1 bg-charcoal-800/60 border border-bronze-400/40 rounded-lg px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all" : "col-span-1 bg-charcoal-800/60 border border-bronze-400/40 rounded-lg px-3 py-2 text-cream-100 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 text-sm transition-all"}
            >
              <option value="">Select Budget Range</option>
              <option value="under-10k">Under $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-50k">$25,000 - $50,000</option>
              <option value="50k-100k">$50,000 - $100,000</option>
              <option value="over-100k">Over $100,000</option>
            </select>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleInputChange} 
              required 
              placeholder="Tell us about your project and requirements *" 
              rows={large ? 4 : 2} 
              className={large ? "col-span-1 md:col-span-2 bg-charcoal-800/60 border border-bronze-400/40 rounded-lg px-4 py-3 text-cream-100 placeholder-bronze-400 shadow-inner focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all resize-none" : "col-span-1 md:col-span-2 bg-charcoal-800/60 border border-bronze-400/40 rounded-lg px-3 py-2 text-cream-100 placeholder-bronze-400 shadow-inner focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 text-sm transition-all resize-none"} 
            />
            <div className={large ? "col-span-1 md:col-span-2 flex justify-center mt-2" : "col-span-1 md:col-span-2 flex justify-center mt-1"}>
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className={large ? "px-10 py-3 bg-gradient-to-r from-bronze-400 to-gold-400 text-charcoal-900 font-bold rounded-lg transition-all hover:scale-105 hover:shadow-lg tracking-widest flex items-center gap-2 uppercase disabled:opacity-50 disabled:cursor-not-allowed" : "px-6 py-2 bg-gradient-to-r from-bronze-400 to-gold-400 text-charcoal-900 font-bold rounded-lg transition-all hover:scale-105 hover:shadow-lg tracking-widest flex items-center gap-2 uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed"}
              >
                {isSubmitting ? <span className="animate-spin w-5 h-5 border-2 border-charcoal-900 border-t-transparent rounded-full" /> : 'Submit'}
                <i className="fas fa-arrow-right" />
              </button>
            </div>
            {submitStatus && (
              <div className={large ? `col-span-2 p-4 rounded-lg text-center text-sm mt-2 ${submitStatus === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}` : `col-span-2 p-2 rounded-lg text-center text-xs mt-1 ${submitStatus === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
                {submitStatus === 'success' ? 'Thank you! Your message has been sent successfully.' : 'Sorry, there was an error sending your message. Please try again.'}
              </div>
            )}
          </form>
          {/* Social Icons */}
          <div className={large ? "flex justify-center gap-4 mb-8" : "flex justify-center gap-3 mb-4"}>
            <a href="https://www.instagram.com/beyond.blueprint/?igsh=cGd4ZTU1enJ3dDhy#" target="_blank" rel="noopener noreferrer" className={large ? "w-9 h-9 rounded-full bg-charcoal-900/80 border border-bronze-400 flex items-center justify-center text-bronze-400 hover:bg-bronze-400 hover:text-charcoal-900 transition-all duration-200" : "w-8 h-8 rounded-full bg-charcoal-900/80 border border-bronze-400 flex items-center justify-center text-bronze-400 hover:bg-bronze-400 hover:text-charcoal-900 transition-all duration-200 text-base"}>
              <i className="fab fa-instagram" />
            </a>
            <a href="https://www.linkedin.com/in/amannjalan/" target="_blank" rel="noopener noreferrer" className={large ? "w-9 h-9 rounded-full bg-charcoal-900/80 border border-bronze-400 flex items-center justify-center text-bronze-400 hover:bg-bronze-400 hover:text-charcoal-900 transition-all duration-200" : "w-8 h-8 rounded-full bg-charcoal-900/80 border border-bronze-400 flex items-center justify-center text-bronze-400 hover:bg-bronze-400 hover:text-charcoal-900 transition-all duration-200 text-base"}>
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
          {/* Minimal contact info row */}
          <div className={large ? "flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-cream-300 text-sm opacity-80 text-center mb-2" : "flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-cream-300 text-xs opacity-80 text-center mb-1"}>
            <span className="flex items-center"><i className="fas fa-map-marker-alt text-bronze-400 mr-1"/>Deva road lucknow</span>
            <span className="text-bronze-400">|</span>
            <span className="flex items-center"><i className="fas fa-envelope text-bronze-400 mr-1"/>beyondblueprintdesign@gmail.com</span>
            <span className="text-bronze-400">|</span>
            <span className="flex items-center"><i className="fas fa-phone text-bronze-400 mr-1"/>9648477743</span>
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
}
