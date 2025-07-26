import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('footer');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    { name: 'Residential Design', href: '/services' },
    { name: 'Commercial Spaces', href: '/services' },
    { name: 'Luxury Interiors', href: '/services' },
    { name: 'Kitchen & Bath', href: '/services' },
    { name: 'Furniture Selection', href: '/services' },
    { name: 'Color Consultation', href: '/services' }
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Testimonials', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' }
  ];

 const socialLinks = [
    { name: 'Instagram', icon: 'fab fa-instagram', href: 'https://www.instagram.com/beyond.blueprint/?igsh=cGd4ZTU1enJ3dDhy#' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/in/amannjalan/' },
  ];

  return (
    <footer id="footer" className="bg-charcoal-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-bronze-400/5 via-transparent to-gold-400/5" />
        <div className="absolute top-20 right-20 w-48 h-48 bg-bronze-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className={`lg:col-span-1 transition-all duration-1000 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-cream-100 mb-4">
                  Beyond <span className="bg-gradient-to-r from-bronze-400 to-gold-400 bg-clip-text text-transparent">Blueprint</span>
                </h3>
                <p className="text-cream-300 leading-relaxed mb-6">
                  Creating extraordinary spaces that inspire, delight, and reflect your unique vision. 
                  Where luxury meets functionality in perfect harmony.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-bronze-400 to-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-charcoal-900 text-sm" />
                  </div>
                  <span className="text-cream-300 text-sm">Deva road lucknow</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-bronze-400 to-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone text-charcoal-900 text-sm" />
                  </div>
                  <span className="text-cream-300 text-sm">9648477743, 90444441424</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-bronze-400 to-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-charcoal-900 text-sm" />
                  </div>
                  <span className="text-cream-300 text-sm">beyondblueprintdesign@gmail.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-cream-100 font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.slice(0, 4).map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="group w-10 h-10 bg-charcoal-800/50 border border-charcoal-700 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-bronze-400 hover:border-bronze-400 hover:scale-110"
                      aria-label={social.name}
                    >
                      <i className={`${social.icon} text-cream-300 group-hover:text-charcoal-900 transition-colors duration-300`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className={`transition-all duration-1000 ease-out delay-200 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h4 className="text-cream-100 font-semibold mb-6 text-lg">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      to={service.href}
                      className="text-cream-300 hover:text-bronze-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <i className="fas fa-chevron-right text-xs text-bronze-400/50 group-hover:text-bronze-400 transition-colors duration-300" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className={`transition-all duration-1000 ease-out delay-400 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h4 className="text-cream-100 font-semibold mb-6 text-lg">Company</h4>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="text-cream-300 hover:text-bronze-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <i className="fas fa-chevron-right text-xs text-bronze-400/50 group-hover:text-bronze-400 transition-colors duration-300" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className={`transition-all duration-1000 ease-out delay-600 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h4 className="text-cream-100 font-semibold mb-6 text-lg">Stay Updated</h4>
              <p className="text-cream-300 text-sm mb-6 leading-relaxed">
                Subscribe to our newsletter for design inspiration, tips, and exclusive offers.
              </p>
              
              <form className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-charcoal-800/50 border border-charcoal-700 rounded-lg text-cream-100 placeholder-cream-300/50 focus:outline-none focus:border-bronze-400 focus:ring-2 focus:ring-bronze-400/20 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="group relative w-full px-6 py-3 bg-gradient-to-r from-bronze-400 to-gold-400 text-charcoal-900 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-bronze-400/25"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Subscribe
                    <i className="fas fa-paper-plane transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-bronze-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </form>

              {/* Awards & Certifications */}
              <div className="mt-8 pt-6 border-t border-charcoal-700">
                <h5 className="text-cream-100 font-medium mb-4">Awards & Recognition</h5>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-bronze-400 to-gold-400 rounded-full flex items-center justify-center">
                    <i className="fas fa-award text-charcoal-900 text-lg" />
                  </div>
                  <div>
                    <p className="text-cream-300 text-sm font-medium">Best Interior Design 2024</p>
                    <p className="text-cream-300/70 text-xs">Design Excellence Awards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-charcoal-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-cream-300 text-sm">
                © {currentYear} Luxury Interiors. All rights reserved.
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <Link to="/privacy" className="text-cream-300 hover:text-bronze-400 transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-cream-300 hover:text-bronze-400 transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link to="/sitemap" className="text-cream-300 hover:text-bronze-400 transition-colors duration-300">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-bronze-400 to-gold-400 text-charcoal-900 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 group"
        aria-label="Back to top"
      >
        <i className="fas fa-chevron-up group-hover:-translate-y-0.5 transition-transform duration-300" />
      </button>
    </footer>
  );
}
