"use client";

import { useState, useEffect, useMemo } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import SortDropdown, { SortOption } from "./SortDropdown";
import { motion } from "framer-motion";

export default function ProductGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  // Fake loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 🔎 Search
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // 🏷 Category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // ↕ Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;

      case "newest":
        result.reverse();
        break;

      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // ⏳ Loader UI
  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6 flex items-center justify-center min-h-[400px]">
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20" id="featured">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Featured Items
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Curated pieces for the modern wardrobe
          </p>
        </motion.div>

        {/* Filters */}
        <div className="space-y-6 mb-12">
          <div className="max-w-md mx-auto">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
            />
          </div>

          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="flex justify-end">
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-gray-500 mb-8">
          {filteredAndSortedProducts.length} products found
        </p>

        {/* Product Results */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">
              No products found
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="underline uppercase tracking-widest"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredAndSortedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}