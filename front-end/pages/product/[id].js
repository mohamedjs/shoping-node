import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../../components/Layout'
import { getProductById } from '../../store/products/product.slice'
import  Slider from "react-slick";
import ImageItem from './ImageItem'

export default  function ProductScreen() {
    const { query } = useRouter()
    const { id }  = query
    let dispatch = useDispatch()
    let {product} = useSelector(state => state.products)
    let [images, setImages] = useState([])
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
        if(id)
            dispatch(getProductById(id)).then((product) => {
                setImages(images => product.payload.images)
            })
    }, [id])
    
    if(!product)
        return <div> not found product</div>;
    return (
        <Layout title={product.title}>
            <div className='py-2'>
                <Link href="/">back to product</Link>
            </div>
            <div className='grid md:grid-cols-4 md:gap-4'>
                <div className='md:col-span-2'>
                    {images.length && 
                    <Slider {...settings}>
                        { images.map((image, index) => (
                            <ImageItem key={index+1} image={image}></ImageItem>
                        ))}
                    </Slider>}
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className='text-lg'>{product.title}</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>{product.rating}</li>
                        <li>Description: {product.description} </li>
                    </ul>
                </div>
                <div className='card p-5'>
                    <div className='mb-2 flex justify-between'>
                        <div>Price</div>
                        <div>${product.price}</div>
                    </div>
                    <div className='mb-2 flex justify-between'>
                        <div>Status</div>
                        <div>{product.stock ? "In Stock" : "unavailable"}</div>
                    </div>
                    <button className='button-primary justify-center items-center w-full'>Add To Cart</button>
                </div>
            </div>
        </Layout>
    )
}

ProductScreen.auth = true