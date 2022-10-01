import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../../components/Layout'
import { getAllProducts } from '../../store/products/product.slice'
import { ProductItem } from '../../components/home/ProductItem'

const SearchScreen = () => {
    const { query } = useRouter()
    const {value}   = query
    let dispatch = useDispatch()
    let {loading , products} = useSelector(state => state.products)
    useEffect(() => {
        if(value)
            dispatch(getAllProducts(value))
    }, [value])
    
  return (
    <Layout title={value}>
        { loading ? <div className="flex items-center justify-center">
                    <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
                  </div>
                : <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                    { products.map((product) => (
                      <ProductItem product={product} key={product.id} />
                    )) } 
                  </div>
      }
    </Layout>
  )
}

export default SearchScreen