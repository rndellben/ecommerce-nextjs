import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const ProductPage = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setIsLoading(false);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='relative h-[400px] md:h-[600px] rounded-lg overflow-hidden'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className='object-cover'
            priority
          />
        </div>

        <div className='flex flex-col justify-between'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold mb-4'>
              {product.name}
            </h1>
            <p className='text-gray-600 dark:text-gray-300 mb-6'>
              {product.description}
            </p>
            <p className='text-2xl font-bold text-primary mb-6'>
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className='space-y-4'>
            <button
              onClick={() => addToCart(product)}
              className='w-full bg-primary text-white py-3 px-6 rounded-lg 
                hover:bg-primary/90 transition-colors duration-200'>
              Add to Cart
            </button>
            <button
              onClick={() => router.back()}
              className='w-full border border-gray-300 dark:border-gray-600 py-3 px-6 
                rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200'>
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  // Fetch product data based on params.id
  const products = await import('../data/products.json');
  const product = products.default.find((p) => p.id === params.id);

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const products = await import('../data/products.json');

  const paths = products.default.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default ProductPage;
