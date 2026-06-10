import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getProductsByCategory, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import AnimatedSection from '../components/AnimatedSection';

const Category = () => {
  const { category } = useParams();
  const products = getProductsByCategory(category);
  const catInfo = categories.find(c => c.id === category);

  const displayName = catInfo?.name || category;

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-20">
      {/* Header */}
      <div className={`py-24 text-center grain-overlay bg-gradient-to-br ${catInfo?.gradient || 'from-amber-900 to-orange-900'}`}>
        <AnimatedSection>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-inter text-xs tracking-widest uppercase text-white/60 hover:text-[#C9943A] transition-colors mb-8"
          >
            <ArrowLeft size={12} /> Back to Shop
          </Link>
          <h1 className="font-cormorant text-6xl lg:text-7xl font-light text-white block">{displayName}</h1>
          {catInfo && (
            <p className="font-inter text-sm text-white/60 mt-4 max-w-md mx-auto">{catInfo.description}</p>
          )}
          <div className="w-24 h-px bg-[#C9943A] mx-auto mt-6" />
        </AnimatedSection>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-cormorant text-3xl text-[#2C1810]/40">No pieces found in this collection yet.</p>
            <Link to="/shop" className="btn-gold mt-8 inline-flex">View All Collections</Link>
          </div>
        ) : (
          <>
            <p className="font-inter text-xs text-[#2C1810]/50 mb-10">
              {products.length} piece{products.length !== 1 ? 's' : ''} in {displayName}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Category;
