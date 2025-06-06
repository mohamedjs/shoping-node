import React from 'react';

const HeroSection = () => (
  <section className="w-full bg-[#fff6f6] rounded-2xl py-12 px-4 flex flex-col md:flex-row items-center justify-between mb-8 shadow-sm">
    <div className="flex-1 mb-8 md:mb-0 md:mr-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
        Buy This Now<br />
        <span className="text-[#ff7e7e]">Become Shining</span>
      </h1>
      <p className="text-lg text-gray-500 mb-6 max-w-lg">
        Experience a delightful e-commerce environment for trading goods and services. Shop the latest trends with ease and joy!
      </p>
      <button className="px-8 py-3 rounded-full bg-[#ff7e7e] text-white font-bold text-lg shadow hover:bg-[#ffb3b3] transition-all duration-300">
        Shop Now
      </button>
    </div>
    <div className="flex-1 flex justify-center">
      {/* Placeholder SVG illustration */}
      <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="60" width="220" height="120" rx="30" fill="#ffeaea" />
        <ellipse cx="130" cy="180" rx="80" ry="20" fill="#ffeaea" />
        <rect x="90" y="80" width="80" height="60" rx="15" fill="#ffb3b3" />
        <rect x="110" y="100" width="40" height="40" rx="10" fill="#fff6f6" />
        <circle cx="130" cy="120" r="10" fill="#ff7e7e" />
        <rect x="170" y="60" width="10" height="40" rx="5" fill="#b3e5ff" />
        <rect x="80" y="60" width="10" height="40" rx="5" fill="#b3e5ff" />
      </svg>
    </div>
  </section>
);

export default HeroSection; 