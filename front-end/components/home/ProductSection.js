import { ProductItem } from './ProductItem'
import Link from 'next/link';
import { useSelector } from 'react-redux'
import React from 'react'
import Slider from "react-slick";

const ProductSection = ({categoryName}) => {
    let {products} = useSelector(state => state.products)
    var product_settings = {
        dots: false,
        infinite: false,
        autoplay: true,
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
            breakpoint: 600,
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
    <div className="flex flex-col justify-between">
            <Link href={`/category/${categoryName}`}>
                <div className='flex h-12 items-center px-3 mb-3 bg-cyan-300 justify-between shadow-md'>
                    <div className="cursor-pointer text-black text-base font-bold">{categoryName}</div>
                    <a className="cursor-pointer text-black text-base font-bold flex">
                        See All >
                    </a>
                </div>
            </Link>
            <Slider {...product_settings}>
                { 
                    products.map((product) => (
                    product.category === categoryName ? <div key={product.id} className="p-2"><ProductItem product={product} key={product.id} /> </div>: ''
                    )) 
                } 
            </Slider>
    </div>
  )
}

export default ProductSection