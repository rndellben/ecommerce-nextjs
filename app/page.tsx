import ProductList from '@/components/ProductList';

// Server Component
async function getProducts() {
  const products = await import('../data/products.json');
  return products.default;
}

export default async function Home() {
  const products = await getProducts();
  return <ProductList initialProducts={products} />;
}
