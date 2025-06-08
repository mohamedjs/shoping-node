import React from 'react';

const TrendingSearches = () => {
  let { load, categories } = useSelector(state => state.categories)

 return  <section className="w-full flex flex-col items-center mb-8">
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((item, idx) => (
        <button
          key={item.id}
          className="px-5 py-2 rounded-full bg-white text-gray-700 border border-[#ffeaea] shadow-sm hover:bg-[#ff7e7e] hover:text-white hover:border-[#ff7e7e] transition-all duration-200 font-medium text-sm"
        >
          {item.name}
        </button>
      ))}
    </div>
  </section>
};

export default TrendingSearches; 