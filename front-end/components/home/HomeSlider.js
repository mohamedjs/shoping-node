import Link from 'next/link';
import Image from 'next/image'
import Slider from "react-slick";
import { useSelector, useDispatch } from 'react-redux';
import BannerImage from "../../public/images/tshirt1.png";

const HomeSlider = () => {
    let {loading , products} = useSelector(state => state.products)
    let {categories} = useSelector(state => state.categories)
    let dispatch = useDispatch()
    var settings = {
        dots: true,
        arrows: false,
        infinite: false,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };
  return (
    <div className="flex gap-1 justify-between mb-3 w-full h-[420px]">
        <div className="card w-1/6 h-[420px]">
            { categories.map((category, index) => ( 
                index < 10 ?
                <Link key={index} href={`/category/${category}`}> 
                <div className="flex cursor-pointer p-1" key={index}>
                    <svg className="h-8 w-8 mr-3 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />  <polygon points="12 15 17 21 7 21 12 15" /></svg>
                    <h1>{category}</h1>
                </div></Link> : ''
            ))}
        </div>
        <Slider className="w-4/6 shadow-md"  {...settings}>
            { 
                products.map((product, index) => (
                    index < 6 ?
                    <Link href={`/product/${product.id}`}>
                        <div key={product.id}>
                            <img 
                                src={product.thumbnail}
                                alt={product.title}
                                className="responsive w-full object-fit h-[420px] rounded"
                            />
                        </div>
                    </Link> : ''
                )) 
            } 
        </Slider>
        <div className="flex flex-col w-1/6 h-[420px]">
            {products.map((product, index) => (
                index < 2 ?
                <div key={index}>
                    <img
                        src={product.thumbnail}
                        alt="title"
                        className="w-[100%] h-[207px] mb-1"
                    />
                </div> : ''
            ))}
        </div>
    </div>
  )
}

export default HomeSlider