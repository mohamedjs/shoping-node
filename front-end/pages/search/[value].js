import { useSelector, useDispatch } from 'react-redux'
import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../../components/Layout'
import { getAllProducts } from '../../store/products/product.slice'
import Loading from '../../components/loading/index'
import ProductGrid from '../../components/product/ProductGrid'

const SearchScreen = () => {
  let {loading , products} = useSelector(state => state.products)
  let dispatch = useDispatch()
  const { query } = useRouter()
  const {value}   = query
  useEffect(() => {
      if(value)
          dispatch(getAllProducts({search: value}))
  }, [value])
    
  return (
    <Layout title={value}>
      { loading 
          ? <Loading />
          : <ProductGrid products={products} />
      }
    </Layout>
  )
}

export default SearchScreen