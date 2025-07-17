import React from 'react';

const Media = () => (
  <section className="min-h-screen bg-black flex items-center justify-center py-20">
    <div className="glass-effect max-w-xl w-full p-10 rounded-2xl shadow-2xl border-l-8 border-[#bfa074]/80">
      <h2 className="text-3xl font-bold mb-6 text-[#bfa074] tracking-wide text-center">Media Coverage</h2>
      <ul className="list-disc pl-6 text-white/90 text-lg space-y-2">
        <li>Featured in Design Magazine, 2024</li>
        <li>Excellence in Architecture Award, 2023</li>
      </ul>
    </div>
  </section>
);

export default Media;
