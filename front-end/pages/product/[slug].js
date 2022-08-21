import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layout'
import data from '../../utils/data'

export default  function ProductScreen() {
    const { query } = useRouter()
    const { slug }  = query
    const product = data.products.find((product) => product.slug === slug )
    if(!product)
        return <div> not found product</div>;
    return (
        <Layout title={product.name}>
            <div className='py-2'>
                <Link href="/">back to product</Link>
            </div>
            <div className='grid md:grid-cols-4 md:gap-4'>
                <div className='md:col-span-2'>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={640}
                        height={640}
                        layout="responsive"
                    />
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className='text-lg'>{product.name}</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>{product.rating} of {product.numReviews} reviews</li>
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
                        <div>{product.countInStock ? "In Stock" : "unavailable"}</div>
                    </div>
                    <button className='button-primary justify-center items-center w-full'>Add To Cart</button>
                </div>
            </div>
        </Layout>
    )
}
