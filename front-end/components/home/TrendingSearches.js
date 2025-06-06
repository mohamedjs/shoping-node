import React from 'react';

const trending = [
  'T Shirt', 'Women T Shirt', 'Men Pants', 'Skirt', 'Jacket', 'Jeans', 'Watch', 'Suit', 'Belt'
];

const TrendingSearches = () => (
  <section className="w-full flex flex-col items-center mb-8">
    <div className="flex flex-wrap gap-3 justify-center">
      {trending.map((item, idx) => (
        <button
          key={item}
          className="px-5 py-2 rounded-full bg-white text-gray-700 border border-[#ffeaea] shadow-sm hover:bg-[#ff7e7e] hover:text-white hover:border-[#ff7e7e] transition-all duration-200 font-medium text-sm"
        >
          {item}
        </button>
      ))}
    </div>
  </section>
);

export default TrendingSearches; 