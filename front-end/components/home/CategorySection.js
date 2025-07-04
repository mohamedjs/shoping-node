import Link from 'next/link';
import { useSelector } from 'react-redux'
import React from 'react'
import Slider from "react-slick";
import Loading from '../loading/index';

const CategorySection = () => {
    let { load, categories } = useSelector(state => state.categories)
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };

    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold text-[var(--text)] mb-6 px-4">Shop by Category</h2>
        { load
          ? <Loading />  
          : <Slider {...settings} className="category-slider">
              { categories.map((category, index) => (
                <div className="px-2" key={index}>
                  <Link href={`/category/${category.name}`}>
                    <a className="block group">
                      <div className="relative overflow-hidden rounded-xl aspect-square">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-white text-lg font-semibold text-center">{category.name}</h3>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div> 
              ))}
            </Slider>
        }
      </div>
    )
}

export default CategorySection