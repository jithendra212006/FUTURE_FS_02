"use client";

import { Bodoni_Moda } from "next/font/google";
export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden">
        <Image
          src={product.image}      // <-- use first image
          alt={product.name}
          width={500}
          height={600}
          className="w-full h-[420px] object-cover"
        />

        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-0 left-0 right-0 bg-black text-white py-3 text-sm tracking-widest uppercase 
opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"

        >
          Add To Cart
        </button>
      </div>

      <div className="mt-6">
        <p className="uppercase text-gray-500 text-xs tracking-widest mb-1">
          {product.category}
        </p>

        <h3 className={`${bodoni.className} text-xl mb-1`}>
          {product.name}
        </h3>

        <p className="text-lg">${product.price}</p>
      </div>
    </motion.div>
  );
}
