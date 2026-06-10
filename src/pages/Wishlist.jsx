import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import AnimatedSection from '../components/AnimatedSection';

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`;

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] pt-20 flex items-center justify-center">
        <div className="text-center py-20">
          <Heart size={48} className="text-[#C9943A]/40 mx-auto mb-6" strokeWidth={1} />
          <h1 className="font-cormorant text-5xl font-light text-[#2C1810] mb-4">Your Wishlist is Empty</h1>
          <p className="font-inter text-sm text-[#2C1810]/50 mb-10">
            Save pieces you love — your Chikankari wishlist awaits.
          </p>
          <Link to="/shop" className="btn-gold-filled">Discover Collections</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-20">
      {/* Header */}
      <div className="bg-[#2C1810] py-16 text-center grain-overlay">
        <AnimatedSection>
          <h1 className="font-cormorant text-5xl font-light text-[#FFFEF9]">Wishlist</h1>
          <p className="font-inter text-sm text-[#FAF8F4]/50 mt-3">{items.length} piece{items.length !== 1 ? 's' : ''} saved</p>
        </AnimatedSection>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group"
              >
                {/* Image */}
                <div
                  className={`relative aspect-[3/4] bg-gradient-to-br ${item.gradient} mb-4 overflow-hidden`}
                  style={{ backgroundColor: item.bgColor }}
                >
                  <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full opacity-15" fill="none">
                    <circle cx="150" cy="200" r="70" stroke="#C9943A" strokeWidth="0.5" />
                    <circle cx="150" cy="200" r="40" stroke="#C9943A" strokeWidth="0.5" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                      <line key={a} x1="150" y1="200"
                        x2={150 + 70 * Math.cos(a * Math.PI / 180)}
                        y2={200 + 70 * Math.sin(a * Math.PI / 180)}
                        stroke="#C9943A" strokeWidth="0.3" />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-cormorant text-4xl font-light text-[#2C1810]/15 select-none">
                      {item.name.split(' ')[0]}
                    </span>
                  </div>

                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-[#2C1810]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="bg-[#C9943A] text-white p-3 hover:bg-[#B8860B] transition-colors"
                    >
                      <ShoppingBag size={16} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="bg-white text-[#2C1810] p-3 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-[#C9943A] mb-1">{item.stitchType}</p>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-cormorant text-xl font-medium text-[#2C1810] hover:text-[#C9943A] transition-colors mb-1">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-sm text-[#2C1810]">{formatPrice(item.price)}</span>
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="font-inter text-xs tracking-widest uppercase text-[#C9943A] hover:text-[#B8860B] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
