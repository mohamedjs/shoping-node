import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
import React, {useEffect} from 'react'
import { getAllCategories } from '../../store/categories/category.slice'
import Slider from "react-slick";

const CategorySection = () => {
    let {categories} = useSelector(state => state.categories)
    let dispatch = useDispatch()
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
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
    useEffect(() => {
        dispatch(getAllCategories())   
    },[])
  return (
    <Slider {...settings}>
        { categories.map((category, index) => (
        <div className="transition duration-300 hover:scale-[1.1] p-4 mt-3 cursor-pointer" key={index}>
            <Link href={`/category/${category}`}>
            <a className="relative w-full h-[200px] rounded inline-block">
            <div className="absolute left-0 bottom-0 w-full h-full z-10">
                <img
                src={`https://picsum.photos/id/${index}/200/300`}
                className="absolute left-0 top-0 w-full h-full rounded z-10 object-cover"
                />
            </div>
            <div className="p-4 absolute bg-cyan-500 shadow-lg shadow-cyan-500/50 bottom-0 inset-x-0 z-20">
                <h3 className="bottom-px text-center text-white">{category}</h3>
            </div>
            </a>
            </Link>
        </div> 
        )) }
    </Slider>
  )
}

export default CategorySection