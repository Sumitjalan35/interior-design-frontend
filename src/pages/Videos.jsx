import React from 'react';

const Videos = () => (
  <section className="min-h-screen bg-black flex items-center justify-center py-20">
    <div className="glass-effect max-w-3xl w-full p-10 rounded-2xl shadow-2xl border-l-8 border-[#bfa074]/80">
      <h2 className="text-3xl font-bold mb-6 text-[#bfa074] tracking-wide text-center">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[1, 2].map(num => (
          <iframe key={num} className="w-full h-64 rounded-xl" src={`https://www.youtube.com/embed/sample${num}`} title={`Video ${num}`}></iframe>
        ))}
      </div>
    </div>
  </section>
);

export default Videos;
