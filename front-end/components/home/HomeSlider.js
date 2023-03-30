import Link from 'next/link';
import Slider from "react-slick";
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../loading/index';

const HomeSlider = () => {
    let { load, categories } = useSelector(state => state.categories)
    let { loading, products } = useSelector(state => state.products)
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
    <>
    {
        load || loading 
        ? <Loading />
        : <div className="flex gap-1 justify-between mb-16 w-full h-[420px]">
            <div className="card w-1/6 h-[420px]">
                { categories.map((category, index) => ( 
                    <Link key={index} href={`/category/${category.name}`}> 
                        <div className="flex cursor-pointer justify-start p-1" key={index}>
                            <i className={`h-8 w-8 mr-3 mt-3 text-center text-red-500 fa-solid fa-${category.icon} fa-lg`}></i>
                            <h1>{category.name}</h1>
                        </div>
                    </Link>
                ))}
            </div>
            <Slider className="w-4/6 shadow-md"  {...settings}>
                { 
                    products.map((product, index) => (
                        <Link href={`/product/${product.id}`} key={index}>
                            <div key={product.id}>
                                <img 
                                    src={product.image}
                                    alt={product.name}
                                    className="responsive w-full object-fit h-[420px] rounded"
                                />
                            </div>
                        </Link>
                    )) 
                } 
            </Slider>
            <div className="flex flex-col w-1/6 h-[420px]">
                {products.map((product, index) => (
                    index < 2 ?
                    <div key={index}>
                        <img
                            src={product.image}
                            alt="title"
                            className="w-[100%] h-[207px] mb-1"
                        />
                    </div> : ''
                ))}
            </div>
        </div>            
    }
    </>
  )
}

export default HomeSlider