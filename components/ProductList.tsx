"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../types';
import SearchBar from '@/components/SearchBar';
import ProductDetails from '@/components/ProductDetails';
import { heroSection, specialOffer, testimonials, newsletterSection } from '@/data';

function ProductCard({ product, onViewDetails }: { 
  product: Product;
  onViewDetails: (id: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden 
        shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-64">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-300
            ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 line-clamp-1">{product.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-lg">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onViewDetails(product.id)}
            className="bg-primary text-white px-4 py-2 rounded-lg 
              hover:bg-primary/90 transition-colors duration-200 cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleViewDetails = (id: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProductId(id);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProductId(null);
      setIsTransitioning(false);
    }, 300);
  };

  if (selectedProductId) {
    return (
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <ProductDetails productId={selectedProductId} onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {/* Hero Section */}
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={heroSection.backgroundImage}
            alt="Hero background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={100}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeIn">
            {heroSection.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fadeIn">
            {heroSection.description}
          </p>
          <Link
            href="#products"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg 
              text-lg font-medium transition-colors duration-200 animate-fadeIn"
          >
            {heroSection.buttonText}
          </Link>
        </div>
      </div>

      {/* Special Offer Banner */}
      <div className="bg-primary/10 dark:bg-primary/5 py-4 text-center">
        <p className="text-primary font-medium">
          🎉 {specialOffer.text} {specialOffer.code}
        </p>
      </div>

      {/* Products Section */}
      <section id="products" className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <SearchBar onSearch={(term) => {
            const filtered = initialProducts.filter((product) =>
              product.name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredProducts(filtered);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{newsletterSection.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {newsletterSection.description}
          </p>
          <form className="flex gap-4">
            <input
              type="email"
              placeholder={newsletterSection.placeholder}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 
                dark:border-gray-600 dark:bg-gray-800"
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg 
                hover:bg-primary/90 transition-colors duration-200"
            >
              {newsletterSection.buttonText}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
} 