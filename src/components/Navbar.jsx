import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems: cartCount } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'bg-[#FAF8F4]/95 backdrop-blur-md shadow-sm border-b border-[#C9943A]/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/shop"
                className="font-inter text-xs tracking-[0.2em] uppercase text-[#2C1810] hover:text-[#C9943A] transition-colors duration-300"
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="font-inter text-xs tracking-[0.2em] uppercase text-[#2C1810] hover:text-[#C9943A] transition-colors duration-300"
              >
                About
              </Link>
            </div>

            {/* Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <div className="text-center">
                <span className="font-cormorant text-2xl lg:text-3xl font-light tracking-wide">
                  <em className="text-[#C9943A] not-italic font-normal">Noor</em>
                  <span className="text-[#2C1810]">-e-Chikan</span>
                </span>
              </div>
            </Link>

            {/* Right icons */}
            <div className="hidden md:flex items-center gap-5">
              <button className="text-[#2C1810] hover:text-[#C9943A] transition-colors duration-300">
                <Search size={18} strokeWidth={1.5} />
              </button>
              <Link to="/wishlist" className="relative text-[#2C1810] hover:text-[#C9943A] transition-colors duration-300">
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C9943A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-inter">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative text-[#2C1810] hover:text-[#C9943A] transition-colors duration-300">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C9943A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-inter">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-[#2C1810] hover:text-[#C9943A] transition-colors ml-auto"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#FAF8F4] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-[#C9943A]/20">
              <span className="font-cormorant text-2xl font-light">
                <em className="text-[#C9943A] not-italic">Noor</em>
                <span className="text-[#2C1810]">-e-Chikan</span>
              </span>
              <button onClick={() => setMobileOpen(false)} className="text-[#2C1810]">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col gap-0 px-6 pt-8">
              {[
                { label: 'Home', to: '/' },
                { label: 'Shop', to: '/shop' },
                { label: 'Kurtas', to: '/category/kurtas' },
                { label: 'Sarees', to: '/category/sarees' },
                { label: 'Dupattas', to: '/category/dupattas' },
                { label: 'Suit Sets', to: '/category/suit-sets' },
                { label: 'Kurtis', to: '/category/kurtis' },
                { label: 'About', to: '/about' },
                { label: 'Wishlist', to: '/wishlist' },
                { label: 'Cart', to: '/cart' },
              ].map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className="block py-4 font-cormorant text-3xl font-light text-[#2C1810] hover:text-[#C9943A] border-b border-[#C9943A]/10 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
