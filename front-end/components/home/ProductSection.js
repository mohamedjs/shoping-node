import Link from 'next/link';
import { useSelector } from 'react-redux'
import React from 'react'
import Slider from "react-slick";
import Loading from '../loading/index';
import { ProductItem } from '../product/ProductItem';

const ProductSection = ({categoryName}) => {
    let {loading, products} = useSelector(state => state.products)
    var product_settings = {
        dots: true,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
            }
        },
        {
            breakpoint: 768,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        }
        ]
    };

  return (
    <div className="py-8">
      {loading 
        ? <Loading />
        : <div className="space-y-6">
            <Link href={`/category/${categoryName}`}>
                <div className='flex items-center justify-between p-4 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-xl hover:from-[var(--secondary)]/10 hover:to-[var(--primary)]/10 transition-all duration-300 cursor-pointer'>
                    <div className="text-[var(--text)] text-lg font-bold">{categoryName}</div>
                    <div className="flex items-center space-x-2 text-[var(--primary)] group">
                        <span className="font-semibold">See All</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </Link>
            <Slider {...product_settings} className="product-slider">
                { products.filter(product => product.category.name === categoryName).map(product => (
                    <div key={product.id} className="px-2">
                        <ProductItem product={product} key={product.id} /> 
                    </div>
                ))}
            </Slider>
        </div>
      }
    </div>
  )
}

export default ProductSection