"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { ArrowLeftIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import CartNotification from "./CartNotification";

interface ProductDetailsProps {
  productId: string;
  onBack: () => void;
}

export default function ProductDetails({ productId, onBack }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product data...");
        const products = await import("@/data/products.json").then((module) => module.default || module);
        
        console.log("Products data:", products);
        if (!products || !Array.isArray(products)) {
          throw new Error("Invalid products data: Not an array");
        }

        const foundProduct = products.find((p) => p.id === productId);
        
        if (!foundProduct) {
          console.warn(`Product with ID "${productId}" not found.`);
        }

        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const currentQuantityInCart = cart.find((item) => item.id === productId)?.quantity || 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/" className="text-primary hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary mb-8 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to products
        </button>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-white dark:bg-gray-800">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl text-primary font-semibold">${product.price.toFixed(2)}</p>
              {currentQuantityInCart > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {currentQuantityInCart} in cart
                </p>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-600 dark:text-gray-300">Quantity:</label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300 dark:border-gray-600">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg 
                text-white font-medium transition-all duration-300 transform
                ${addedToCart ? "bg-green-500 hover:bg-green-600" : "bg-primary hover:bg-primary/90"}`}
            >
              <ShoppingBagIcon className="h-5 w-5" />
              <span>{addedToCart ? "Added to Cart!" : "Add to Cart"}</span>
            </button>

            {/* Additional Product Info */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Premium Quality Materials</li>
                <li>• Free Shipping</li>
                <li>• 30-Day Return Policy</li>
                <li>• 1 Year Warranty</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <CartNotification
        show={addedToCart}
        message={`Added ${quantity} ${quantity === 1 ? "item" : "items"} to cart!`}
      />
    </div>
  );
}
