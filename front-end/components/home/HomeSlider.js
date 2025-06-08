import Link from 'next/link';
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import Loading from '../loading/index';
import { useMemo } from 'react';

const trendingSearches = [
    'T Shirt', 'Women T Shirt', 'Men Pants', 'Skirt', 'Jacket Male', 'Watch', 'Suit'
];

const heroIllustration = '/hero-illustration.svg'; // Replace with your illustration path

const HomeSlider = () => {
    let { load, categories } = useSelector(state => state.categories)
    let { loading, products } = useSelector(state => state.products)

    var settings = {
        dots: true,
        arrows: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        fade: true,
        cssEase: 'linear',
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false
                }
            }
        ]
    };

    // Get only first 6 products for slider
    const sliderProducts = useMemo(() => products.slice(0, 6), [products]);
    // Get best seller/popular products (next 4)
    const bestSellers = useMemo(() => products.slice(6, 8), [products]);

    return (
        <div className="py-8">
            {load || loading 
                ? <Loading />
                : <div className="flex gap-6 justify-between mb-16 w-full h-[420px]">
                    {/* Hero Section */}
                    <div className="flex flex-col justify-between w-1/4 h-[420px] bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text)] mb-4 leading-tight">Buy This Now<br/>Become Shining</h1>
                            <p className="text-gray-500 mb-6">Ecommerce or electronic commerce is the trading of goods and services.</p>
                            <Link href="/shop">
                                <a className="button-primary px-8 py-3 text-lg">Shop now</a>
                            </Link>
                        </div>
                        <img src={heroIllustration} alt="Hero Illustration" className="absolute bottom-0 right-0 w-40 h-40 object-contain pointer-events-none select-none" style={{zIndex:0, opacity:0.9}} />
                        <div className="mt-8 flex flex-wrap gap-2 z-10 relative">
                            {categories.map((category, idx) => (
                                <span key={category.id} className="bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-semibold cursor-pointer hover:bg-[var(--primary)]/20 transition">{category.name}</span>
                            ))}
                        </div>
                    </div>
                    {/* Product Slider */}
                    <Slider className="w-2/4 rounded-xl overflow-hidden shadow-lg" {...settings}>
                        {sliderProducts.map((product, index) => (
                            <Link href={`/product/${product.id}`} key={index}>
                                <div className="relative group h-[420px] cursor-pointer">
                                    <img 
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                        <h2 className="text-2xl font-bold mb-2 drop-shadow-lg">{product.name}</h2>
                                        <p className="text-lg font-semibold drop-shadow">${product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                    {/* Best Seller/Popular Products */}
                    <div className="flex flex-col w-1/4 h-[420px] gap-4">
                        <h3 className="text-lg font-bold text-[var(--text)] mb-2 px-2">Best Seller</h3>
                        {bestSellers.map((product, index) => (
                            <Link href={`/product/${product.id}`} key={index}>
                                <div className="relative group rounded-xl overflow-hidden h-[200px] bg-white shadow-md cursor-pointer">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <p className="font-semibold text-base">{product.name}</p>
                                        <p className="text-sm">${product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>            
            }
        </div>
    )
}

export default HomeSlider