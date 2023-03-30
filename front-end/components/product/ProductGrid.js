import React from 'react'
import { ProductItem } from './ProductItem'

export default function ProductGrid({products}) {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        { products.map((product) => (
            <ProductItem product={product} key={product.id} />
        )) } 
    </div>
  )
}
