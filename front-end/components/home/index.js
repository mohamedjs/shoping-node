import { useSelector } from 'react-redux'
import React from 'react'
import CategorySection from './CategorySection';
import ProductSection from './ProductSection';
import HomeSlider from './HomeSlider';
import Loading from '../loading/index';

export default function HomePage() {
  let { load, categories } = useSelector(state => state.categories)
  return (
    <>
      <HomeSlider /> 
      <CategorySection categories={categories} />
      { load 
        ? <Loading />    
        : <>
          { categories.map((category, index) => (
            <ProductSection key={index} categoryName={category.name} />
          ))}
         </>
      }
    </>
  )
}
