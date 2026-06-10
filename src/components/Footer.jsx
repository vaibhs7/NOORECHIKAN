import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#2C1810] text-[#FAF8F4]">
      {/* Newsletter */}
      <div className="border-b border-[#C9943A]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-4">Join Our World</p>
          <h2 className="font-cormorant text-4xl lg:text-5xl font-light text-[#FFFEF9] mb-3">
            Stories Woven in Every Thread
          </h2>
          <p className="font-inter text-sm text-[#FAF8F4]/60 mb-8 max-w-md mx-auto">
            Subscribe for new arrivals, artisan stories, and the poetry of Chikankari delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 bg-transparent border border-[#C9943A]/40 text-[#FFFEF9] placeholder-[#FAF8F4]/40 font-inter text-sm focus:outline-none focus:border-[#C9943A] transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-[#C9943A] text-[#FFFEF9] font-inter text-xs tracking-widest uppercase hover:bg-[#B8860B] transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-cormorant text-3xl font-light">
                <em className="text-[#C9943A] not-italic">Noor</em>
                <span className="text-[#FFFEF9]">-e-Chikan</span>
              </span>
            </div>
            <p className="font-inter text-sm text-[#FAF8F4]/60 leading-relaxed mb-6">
              From the ancient lanes of Lucknow, we carry forward a 400-year-old tradition of hand-embroidered Chikankari. Every piece is a poem.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 border border-[#C9943A]/40 flex items-center justify-center text-[#C9943A] hover:bg-[#C9943A] hover:text-[#2C1810] transition-all duration-300"
                >
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-inter text-xs tracking-[0.2em] uppercase text-[#C9943A] mb-6">Collections</h3>
            <ul className="space-y-3">
              {['Kurtas', 'Sarees', 'Dupattas', 'Suit Sets', 'Kurtis'].map(cat => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat.toLowerCase().replace(' ', '-')}`}
                    className="font-inter text-sm text-[#FAF8F4]/60 hover:text-[#C9943A] transition-colors duration-200"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-inter text-xs tracking-[0.2em] uppercase text-[#C9943A] mb-6">Company</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Our Artisans', to: '/about' },
                { label: 'Sustainability', to: '/about' },
                { label: 'Press', to: '/about' },
                { label: 'Careers', to: '/about' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="font-inter text-sm text-[#FAF8F4]/60 hover:text-[#C9943A] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-inter text-xs tracking-[0.2em] uppercase text-[#C9943A] mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#C9943A] mt-1 shrink-0" strokeWidth={1.5} />
                <span className="font-inter text-sm text-[#FAF8F4]/60 leading-relaxed">
                  Chowk, Lucknow<br />Uttar Pradesh, India 226003
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#C9943A] shrink-0" strokeWidth={1.5} />
                <span className="font-inter text-sm text-[#FAF8F4]/60">+91 9876 543 210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#C9943A] shrink-0" strokeWidth={1.5} />
                <span className="font-inter text-sm text-[#FAF8F4]/60">hello@noorechikan.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#C9943A]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-[#FAF8F4]/40">
            © 2024 Noor-e-Chikan. All rights reserved. Crafted with love in Lucknow.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy', 'Returns'].map(link => (
              <a key={link} href="#" className="font-inter text-xs text-[#FAF8F4]/40 hover:text-[#C9943A] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
