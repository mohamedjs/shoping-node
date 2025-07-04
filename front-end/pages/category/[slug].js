import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../../components/Layout'
import { getAllProducts } from '../../store/products/product.slice'
import { ProductItem } from '../../components/product/ProductItem'
import Loading from '../../components/loading/index'
import ProductGrid from '../../components/product/ProductGrid'
import { getAllCategories } from '../../store/categories/category.slice'

const CategoryScreen = () => {
  const { loading } = useSelector(state => state.products)
  const dispatch = useDispatch()
  const { query } = useRouter()
  const { slug }  = query
  useEffect(() => {
      if(slug)
          dispatch(getAllProducts({category_name: slug}))
          dispatch(getAllCategories())   

  }, [slug])
    
  return (
    <Layout title={slug}>
        { loading 
          ? <Loading />
          : <ProductGrid />
      }
    </Layout>
  )
}

export default CategoryScreen