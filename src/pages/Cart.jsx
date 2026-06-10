import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import AnimatedSection from '../components/AnimatedSection';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] pt-20 flex items-center justify-center">
        <div className="text-center py-20">
          <ShoppingBag size={48} className="text-[#C9943A]/40 mx-auto mb-6" strokeWidth={1} />
          <h1 className="font-cormorant text-5xl font-light text-[#2C1810] mb-4">Your Cart is Empty</h1>
          <p className="font-inter text-sm text-[#2C1810]/50 mb-10">
            Your cart awaits beautiful Chikankari pieces.
          </p>
          <Link to="/shop" className="btn-gold-filled">Explore Collections</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-20">
      {/* Header */}
      <div className="bg-[#2C1810] py-16 text-center grain-overlay">
        <AnimatedSection>
          <h1 className="font-cormorant text-5xl font-light text-[#FFFEF9]">Your Cart</h1>
          <p className="font-inter text-sm text-[#FAF8F4]/50 mt-3">{items.length} piece{items.length !== 1 ? 's' : ''} selected</p>
        </AnimatedSection>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-6 bg-[#FFFEF9] border border-[#C9943A]/20 p-5"
                >
                  {/* Thumbnail */}
                  <div
                    className={`w-24 h-32 bg-gradient-to-br ${item.gradient} shrink-0 relative overflow-hidden`}
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <svg viewBox="0 0 100 130" className="absolute inset-0 w-full h-full opacity-20" fill="none">
                      <circle cx="50" cy="65" r="30" stroke="#C9943A" strokeWidth="0.8" />
                      <circle cx="50" cy="65" r="15" stroke="#C9943A" strokeWidth="0.5" />
                    </svg>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-[#C9943A] mb-1">{item.stitchType}</p>
                    <h3 className="font-cormorant text-xl font-medium text-[#2C1810] mb-1">{item.name}</h3>
                    <p className="font-inter text-xs text-[#2C1810]/50 mb-4">{item.fabric} · {item.color}</p>

                    <div className="flex items-center justify-between flex-wrap gap-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-[#C9943A]/30">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#2C1810] hover:text-[#C9943A] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-inter text-sm text-[#2C1810]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#2C1810] hover:text-[#C9943A] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-cormorant text-xl text-[#2C1810]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#2C1810]/30 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={clearCart}
              className="font-inter text-xs tracking-widest uppercase text-[#2C1810]/40 hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#FFFEF9] border border-[#C9943A]/20 p-8 sticky top-24">
              <h2 className="font-cormorant text-2xl font-medium text-[#2C1810] mb-6">Order Summary</h2>
              <div className="w-10 h-px bg-[#C9943A] mb-6" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-inter text-sm text-[#2C1810]/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-inter text-sm text-[#2C1810]/70">
                  <span>Shipping</span>
                  <span className="text-emerald-700">Free</span>
                </div>
                <div className="w-full h-px bg-[#C9943A]/20 my-4" />
                <div className="flex justify-between font-cormorant text-2xl text-[#2C1810]">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button className="w-full btn-gold-filled mb-3 text-sm">
                Proceed to Checkout
              </button>
              <Link to="/shop" className="w-full btn-gold text-sm flex items-center justify-center">
                Continue Shopping
              </Link>

              <p className="font-inter text-[10px] text-[#2C1810]/40 text-center mt-6 leading-relaxed">
                Free shipping on all orders. Returns accepted within 14 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
