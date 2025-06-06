import Link from 'next/link';

export const ProductItem = ({ product }) => {
  return (
    <div className='card group'>
        <Link href={`/product/${product.id}`}>
            <a className="block relative overflow-hidden rounded-t-xl">
                <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
        </Link>
        <div className='p-6 space-y-3'>
            <Link href={`/product/${product.id}`}>
                <a>
                    <h2 className='text-lg font-semibold text-[var(--text)] hover:text-[var(--primary)] transition-colors duration-300'>{product.brand}</h2>
                </a>
            </Link>
            <p className='text-sm text-gray-600'>{product.stock}</p>
            <div className="flex items-center justify-between">
                <p className='text-xl font-bold text-[var(--primary)]'>${product.price}</p>
                <button 
                    className='button-primary bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:from-[var(--secondary)] hover:to-[var(--primary)]' 
                    type='button'
                >
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
  )
}
