import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`;

  const badgeColors = {
    new: 'bg-emerald-700',
    bestseller: 'bg-[#C9943A]',
    limited: 'bg-[#2C1810]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      {/* Image area */}
      <div className="relative overflow-hidden aspect-[3/4] mb-4">
        <div
          className={`w-full h-full bg-gradient-to-br ${product.gradient} transition-transform duration-700 group-hover:scale-105`}
          style={{ backgroundColor: product.bgColor }}
        >
          {/* Decorative SVG placeholder */}
          <svg
            viewBox="0 0 300 400"
            className="absolute inset-0 w-full h-full opacity-20"
            fill="none"
          >
            <circle cx="150" cy="200" r="80" stroke="#C9943A" strokeWidth="0.5" />
            <circle cx="150" cy="200" r="50" stroke="#C9943A" strokeWidth="0.5" />
            <circle cx="150" cy="200" r="20" stroke="#C9943A" strokeWidth="0.5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="150"
                y1="200"
                x2={150 + 80 * Math.cos((angle * Math.PI) / 180)}
                y2={200 + 80 * Math.sin((angle * Math.PI) / 180)}
                stroke="#C9943A"
                strokeWidth="0.3"
              />
            ))}
          </svg>
          {/* Category text overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-cormorant text-5xl font-light text-[#2C1810]/20 select-none">
              {product.category}
            </span>
          </div>
        </div>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 ${badgeColors[product.badge]} text-white font-inter text-[10px] tracking-widest uppercase px-3 py-1`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center border transition-all duration-300 ${
            wishlisted
              ? 'bg-[#C9943A] border-[#C9943A] text-white'
              : 'bg-white/80 border-white/60 text-[#2C1810] opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={1.5} />
        </button>

        {/* Add to cart overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => addToCart(product)}
            className="w-full py-3 bg-[#2C1810] text-[#FFFEF9] font-inter text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#C9943A] transition-colors duration-300"
          >
            <ShoppingBag size={14} strokeWidth={1.5} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product info */}
      <div>
        <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-[#C9943A] mb-1">
          {product.stitchType}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-cormorant text-xl font-medium text-[#2C1810] hover:text-[#C9943A] transition-colors duration-200 mb-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-inter text-sm font-medium text-[#2C1810]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-inter text-sm text-[#2C1810]/40 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
