import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import AnimatedSection from '../components/AnimatedSection';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = products
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-20">
      {/* Header */}
      <div className="bg-[#2C1810] py-20 text-center grain-overlay">
        <AnimatedSection>
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-4">All Collections</p>
          <h1 className="font-cormorant text-6xl lg:text-7xl font-light text-[#FFFEF9]">The Shop</h1>
          <div className="w-24 h-px bg-[#C9943A] mx-auto mt-6" />
        </AnimatedSection>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`font-inter text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-[#C9943A] border-[#C9943A] text-white'
                  : 'border-[#2C1810]/30 text-[#2C1810] hover:border-[#C9943A] hover:text-[#C9943A]'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-inter text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-[#C9943A] border-[#C9943A] text-white'
                    : 'border-[#2C1810]/30 text-[#2C1810] hover:border-[#C9943A] hover:text-[#C9943A]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="font-inter text-xs tracking-wide bg-transparent border border-[#2C1810]/30 text-[#2C1810] px-4 py-2 focus:outline-none focus:border-[#C9943A]"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Count */}
        <p className="font-inter text-xs text-[#2C1810]/50 mb-8">
          Showing {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
