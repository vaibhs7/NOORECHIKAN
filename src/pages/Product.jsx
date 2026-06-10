import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { getProductById, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import AnimatedSection from '../components/AnimatedSection';

const Product = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="font-cormorant text-4xl text-[#2C1810]/40 mb-6">Product not found.</p>
          <Link to="/shop" className="btn-gold">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`;

  const badgeColors = {
    new: 'bg-emerald-700',
    bestseller: 'bg-[#C9943A]',
    limited: 'bg-[#2C1810]',
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 font-inter text-xs text-[#2C1810]/50">
          <Link to="/" className="hover:text-[#C9943A] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#C9943A] transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-[#C9943A] transition-colors capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-[#2C1810]">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={`aspect-[3/4] bg-gradient-to-br ${product.gradient} relative overflow-hidden`}
              style={{ backgroundColor: product.bgColor }}
            >
              {product.badge && (
                <span className={`absolute top-5 left-5 ${badgeColors[product.badge]} text-white font-inter text-xs tracking-widest uppercase px-4 py-2 z-10`}>
                  {product.badge}
                </span>
              )}
              {/* Decorative SVG */}
              <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full opacity-15" fill="none">
                <circle cx="200" cy="250" r="120" stroke="#C9943A" strokeWidth="0.8" />
                <circle cx="200" cy="250" r="80" stroke="#C9943A" strokeWidth="0.5" />
                <circle cx="200" cy="250" r="40" stroke="#C9943A" strokeWidth="0.5" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                  <line key={a} x1="200" y1="250"
                    x2={200 + 120 * Math.cos(a * Math.PI / 180)}
                    y2={250 + 120 * Math.sin(a * Math.PI / 180)}
                    stroke="#C9943A" strokeWidth="0.4" />
                ))}
                {[0, 60, 120, 180, 240, 300].map(a => (
                  <ellipse key={a} cx={200 + 120 * Math.cos(a * Math.PI / 180)} cy={250 + 120 * Math.sin(a * Math.PI / 180)}
                    rx="15" ry="25"
                    transform={`rotate(${a + 90} ${200 + 120 * Math.cos(a * Math.PI / 180)} ${250 + 120 * Math.sin(a * Math.PI / 180)})`}
                    stroke="#C9943A" strokeWidth="0.5" />
                ))}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-cormorant text-7xl font-light text-[#2C1810]/15 select-none">
                  {product.name.split(' ')[0]}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-3">
              {product.stitchType}
            </p>
            <h1 className="font-cormorant text-5xl lg:text-6xl font-light text-[#2C1810] mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-cormorant text-3xl text-[#2C1810]">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="font-inter text-lg text-[#2C1810]/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="w-16 h-px bg-[#C9943A] mb-6" />

            <p className="font-inter text-sm text-[#2C1810]/70 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-8 bg-[#FFFEF9] border border-[#C9943A]/20 p-6">
              {[
                { label: 'Fabric', value: product.fabric },
                { label: 'Color', value: product.color },
                { label: 'Stitch Type', value: product.stitchType },
                { label: 'Category', value: product.category.replace('-', ' ') },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-[#C9943A] mb-1">{label}</p>
                  <p className="font-inter text-sm text-[#2C1810] capitalize">{value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-3 py-4 font-inter text-sm tracking-widest uppercase transition-all duration-300 ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#2C1810] text-[#FFFEF9] hover:bg-[#C9943A]'
                }`}
              >
                {added ? <Check size={16} /> : <ShoppingBag size={16} strokeWidth={1.5} />}
                {added ? 'Added!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${
                  wishlisted
                    ? 'bg-[#C9943A] border-[#C9943A] text-white'
                    : 'border-[#2C1810]/30 text-[#2C1810] hover:border-[#C9943A] hover:text-[#C9943A]'
                }`}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={1.5} />
              </button>
            </div>

            {/* Care */}
            <p className="font-inter text-xs text-[#2C1810]/40 mt-6">
              Each piece is handcrafted. Minor variations are a mark of authenticity, not imperfection. Dry clean recommended.
            </p>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-cormorant text-4xl font-light text-[#2C1810]">You May Also Love</h2>
              <div className="w-16 h-px bg-[#C9943A] mx-auto mt-4" />
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
