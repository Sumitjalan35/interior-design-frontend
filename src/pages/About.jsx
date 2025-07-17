import React from 'react';

const socialLinks = [
  { icon: 'fab fa-facebook-f', url: '#' },
  { icon: 'fab fa-pinterest-p', url: '#' },
  { icon: 'fab fa-instagram', url: '#' },
  { icon: 'fab fa-youtube', url: '#' },
  { icon: 'fab fa-linkedin-in', url: '#' },
];

export default function About() {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-stretch bg-black">
      {/* Left: Image & Socials */}
      <div className="relative w-full md:w-1/2 flex flex-col items-center bg-black md:items-start md:justify-start">
        <img
          src="/assets/slideshow/1000224866.jpg"
          alt="Aman Jalan, Founder of Beyond Blueprint"
          className="object-cover h-[60vh] md:h-[90vh] w-full md:w-auto md:rounded-r-3xl shadow-2xl mt-[250px] md:mt-[250px]"
        />
        {/* Social Icons */}
        {/* Removed social icons bar */}
      </div>

      {/* Right: Content */}
      <div className="relative w-full md:w-1/2 flex flex-col justify-center px-8 py-16 bg-black/60 backdrop-blur-lg">
        {/* Logo and Brand */}
        <div className="mb-8 flex flex-col items-start">
          <img src="/assets/slideshow/beyond_blueprint_Logo__7_-removebg-preview.png" alt="Logo" className="h-24 w-24 object-contain mb-2" />
          <div className="text-[#bfa77a] tracking-widest text-2xl font-serif font-semibold uppercase">BEYOND BLUEPRINT</div>
          <div className="text-[#bfa77a] text-xs tracking-widest font-light mt-1">DESIGN GROUP</div>
        </div>
        {/* Heading */}
        <h2 className="text-5xl font-light text-[#bfa77a] mb-6 tracking-wide">WHO WE ARE</h2>
        {/* Quote */}
        <blockquote className="text-[#bfa77a] text-xl font-light italic mb-8 border-l-4 border-[#bfa77a] pl-6">
          "At Beyond Blueprint Interiors, we believe every space has a story to tell — and we're here to help you tell yours."
          <br />
          <span className="block mt-2 font-normal">- BEYOND BLUEPRINT</span>
        </blockquote>
        {/* Bio */}
        <div className="text-white/90 text-lg leading-relaxed space-y-4">
          <p>
            Founded by Aman Jalan, Beyond Blueprint was born from a love of transforming everyday spaces into beautiful, functional reflections of the people who live in them.
          </p>
          <p>
            Our mission is to create spaces that feel like home — spaces that inspire, comfort, and spark joy. We specialize in modern, timeless designs with an emphasis on natural materials, clean lines, and thoughtful details.
          </p>
          <p>
            We are a design-and-build firm that works across architecture, interiors, furniture, lighting, product design, and landscaping. Our team has handled a variety of projects including residences, commercial developments, retail outlets, restaurants, spas, and more.
          </p>
          <p>
            Whether you're redesigning a single room or planning a full-scale renovation, our team works closely with you every step of the way, bringing fresh ideas, expert project management, and a collaborative spirit to each project.
          </p>
          <p>
            We can't wait to help you reimagine your space — get in touch and let's create something beautiful together.
          </p>
        </div>
      </div>
    </section>
  );
}
