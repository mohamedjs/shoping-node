import { useEffect } from 'react';
import { Layout } from '../components/Layout'
import HomePage from '../components/home/index';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../store/products/product.slice';
import { getAllCategories } from '../store/categories/category.slice';

export default function Home() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())   
  },[])
  
  return (
    <Layout title="Home">
      <HomePage />
    </Layout>
  )
}
