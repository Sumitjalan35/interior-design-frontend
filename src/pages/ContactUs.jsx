import React from 'react';
import ContactForm from '../components/ContactForm';

const ContactUs = () => (
  <section className="min-h-screen bg-black flex items-center justify-center py-12">
    <div className="glass-effect max-w-2xl w-full p-8 rounded-2xl shadow-2xl border-l-8 border-[#bfa074]/80 flex flex-col items-center relative before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:ring-4 before:ring-gold-400/30 before:blur-xl before:z-0">
      <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-[#bfa074] to-[#fffbe6] text-transparent bg-clip-text drop-shadow-lg tracking-wide text-center uppercase" style={{textShadow: '0 2px 16px #bfa07499'}}>Contact Us</h2>
      <ContactForm />
    </div>
  </section>
);

export default ContactUs;
