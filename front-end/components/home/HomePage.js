import { ProductItem } from './ProductItem'
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect} from 'react'
import { getAllProducts } from '../../store/products/product.slice'
import { getAllCategories } from '../../store/categories/category.slice'
import { categoryImage } from "../../public/images/tshirt1.png";
import Slider from "react-slick";
import CategorySection from './CategorySection';
import ProductSection from './ProductSection';
import HomeSlider from './HomeSlider';

export default function HomePage() {
  let {loading , products} = useSelector(state => state.products)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProducts())   
  },[])
  return (
    <>
      <HomeSlider />
      <CategorySection />
      { loading 
        ? <div className="flex items-center justify-center">
            <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
          </div>      
        : <>
            <ProductSection categoryName="home-decoration" />
            <ProductSection categoryName="laptops" />
            <ProductSection categoryName="smartphones" />
          </>
      }
    </>
  )
}
