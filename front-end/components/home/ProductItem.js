import Link from 'next/link';

export const ProductItem = ({ product }) => {
  return (
    <div className='card'>
        <Link href={`/product/${product.id}`}>
            <a>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className='rounded shadow-md hover:blur-none w-[100%] h-[300px]'
                />
            </a>
        </Link>
        <div className='flex flex-col justify-center items-center p-5'>
            <Link href={`/product/${product.id}`}>
                <a>
                    <h2 className='text-lg'>{product.title}</h2>
                </a>
            </Link>
            <p className='mb-2'>{product.brand}</p>
            <p>${product.price}</p>
            <button className='button-primary bg-gradient-to-r from-violet-500 to-fuchsia-500' type='button'>
                Add to Cart
            </button>
        </div>
    </div>
  )
}
