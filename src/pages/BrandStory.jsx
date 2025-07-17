import React from 'react';

const socialLinks = [
  { icon: 'fab fa-facebook-f', url: '#' },
  { icon: 'fab fa-pinterest-p', url: '#' },
  { icon: 'fab fa-instagram', url: '#' },
  { icon: 'fab fa-youtube', url: '#' },
  { icon: 'fab fa-linkedin-in', url: '#' },
];

export default function BrandStory({ backgroundImage = "/assets/brand-bg.jpg", showBackground = true }) {
  return (
    <section
      className="relative min-h-screen flex items-stretch bg-black"
      style={
        showBackground
          ? {
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      {/* Overlay */}
      {showBackground && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      )}
      {/* Social Icons */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {socialLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#bfa074]/80 text-white text-xl hover:bg-[#bfa074] transition"
          >
            <i className={link.icon}></i>
          </a>
        ))}
      </div>
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-end px-0 md:px-24 py-16">
        <div className="glass-effect max-w-2xl w-full p-10 md:p-16 rounded-xl shadow-2xl border-l-8 border-[#bfa074]/80">
          <div className="flex flex-col gap-6">
            <img src="/assets/slideshow/beyond_blueprint_Logo__7_-removebg-preview.png" alt="Logo" className="h-24 w-24 object-contain mb-2" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-[#bfa074] mb-2 border-b border-[#bfa074]/40 pb-2">BRAND STORY</h2>
            <p className="text-lg text-[#bfa074] font-medium mb-2">
              The House of BEYOND BLUEPRINT is a fingerprint of the discerning visionaries behind its inception.
            </p>
            <div className="text-base md:text-lg text-white/90 space-y-4">
              <p>BEYOND BLUEPRINT manifests an academically informed canon of work that blends European classicism with modernist tropical architecture.</p>
              <p>Our designs, effected by an intuitive sensitivity to client preferences and an obsessive attention to detail, synchronize social and cultural nuances to exude a subtle, yet distinctive, individuality.</p>
              <p>Bringing the serenity of creativity to the design desk, we translate our connection to nature and human interaction with space to compose ergonomic and responsive structural forms.</p>
              <p>Established over a decade ago, BEYOND BLUEPRINT has worked meticulously and with creative vigour to become one of the leading design studios in the country.</p>
              <p>We have developed a prolific roster of work that spans expansive luxury estates, stylishly intimate boutiques, immersive spas, chic restaurants and more.</p>
              <p>The House of BEYOND BLUEPRINT is unique in that it undertakes comprehensive design-to-build services.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
