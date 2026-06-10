import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const About = () => {
  const artisans = [
    { name: 'Ustaad Raheem Khan', role: 'Master of Jaali Work', years: '42 years', area: 'Chowk, Lucknow' },
    { name: 'Noor Fatima', role: 'Tepchi & Murri Specialist', years: '28 years', area: 'Aminabad, Lucknow' },
    { name: 'Salim Ansari', role: 'Bakhiya Shadow Master', years: '35 years', area: 'Nakhas, Lucknow' },
  ];

  const values = [
    { title: 'Fair Wages', desc: 'We pay above-market rates to every artisan in our network, ensuring that mastery is rewarded with dignity.' },
    { title: 'Authentic Craft', desc: 'Every stitch in our pieces is hand-embroidered. No machines. No shortcuts. Only hands and thread and time.' },
    { title: 'Living Heritage', desc: 'We document and preserve stitch techniques, working with cultural bodies to ensure Chikankari is passed to future generations.' },
    { title: 'Sustainable Practice', desc: 'Natural dyes, organic fabrics, and zero-waste packaging. Beauty that does not cost the earth.' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-20">
      {/* Hero */}
      <div className="bg-[#2C1810] py-28 text-center grain-overlay relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-[500px] h-[500px]" fill="none">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => (
              <g key={a} transform={`rotate(${a} 200 200)`}>
                <line x1="200" y1="200" x2="200" y2="60" stroke="#C9943A" strokeWidth="0.5" />
                <ellipse cx="200" cy="100" rx="8" ry="25" stroke="#C9943A" strokeWidth="0.5" />
              </g>
            ))}
            <circle cx="200" cy="200" r="130" stroke="#C9943A" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="80" stroke="#C9943A" strokeWidth="0.3" />
            <circle cx="200" cy="200" r="30" stroke="#C9943A" strokeWidth="0.5" />
          </svg>
        </div>
        <AnimatedSection>
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-6">Our Story</p>
          <h1 className="font-cormorant text-6xl lg:text-8xl font-light text-[#FFFEF9] leading-none">
            The Light of<br />
            <em className="text-[#C9943A]">Chikankari</em>
          </h1>
          <div className="w-24 h-px bg-[#C9943A] mx-auto mt-8" />
        </AnimatedSection>
      </div>

      {/* Brand story */}
      <section className="py-24 bg-[#FAF8F4]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="font-cormorant text-2xl lg:text-3xl font-light italic text-[#C9943A] leading-relaxed mb-8">
              "We believe that every piece of Chikankari carries within it the entire history of Lucknow — its Nawabi refinement, its resilience, its extraordinary beauty."
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="font-inter text-base text-[#2C1810]/70 leading-relaxed mb-6">
              Noor-e-Chikan was born in 2018 from a deep conviction: that the world needed to know the names of the artisans behind the embroidery, not just the names of the garments. Founded by Zara Ahmed, a third-generation Lucknowi who grew up watching her grandmother embroider by lamplight, Noor-e-Chikan is a labor of love and cultural responsibility.
            </p>
            <p className="font-inter text-base text-[#2C1810]/70 leading-relaxed">
              We began with twelve artisans. Today we work with over 200 master craftsmen and women across the ancient lanes of Lucknow — Chowk, Aminabad, Nakhas — ensuring their art reaches hands and hearts around the world, while they receive the recognition and compensation that their mastery deserves.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#FFFEF9] grain-overlay">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-4">Our Principles</p>
            <h2 className="font-cormorant text-5xl font-light text-[#2C1810]">What We Stand For</h2>
            <div className="w-24 h-px bg-[#C9943A] mx-auto mt-6" />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="text-center p-6 border border-[#C9943A]/20 hover:border-[#C9943A] transition-colors duration-300">
                  <div className="w-10 h-10 border border-[#C9943A] flex items-center justify-center mx-auto mb-6">
                    <div className="w-3 h-3 bg-[#C9943A] rounded-full" />
                  </div>
                  <h3 className="font-cormorant text-2xl font-medium text-[#2C1810] mb-4">{v.title}</h3>
                  <p className="font-inter text-sm text-[#2C1810]/60 leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Artisans */}
      <section className="py-24 bg-[#2C1810] grain-overlay">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-4">The Hands Behind</p>
            <h2 className="font-cormorant text-5xl font-light text-[#FFFEF9]">Our Master Artisans</h2>
            <div className="w-24 h-px bg-[#C9943A] mx-auto mt-6" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artisans.map((a, i) => (
              <AnimatedSection key={a.name} delay={i * 0.15}>
                <div className="border border-[#C9943A]/30 p-8 text-center hover:border-[#C9943A] transition-colors duration-300">
                  {/* Portrait placeholder */}
                  <div className="w-24 h-24 mx-auto mb-6 border-2 border-[#C9943A]/40 rounded-full bg-gradient-to-br from-[#C9943A]/20 to-[#B8860B]/10 flex items-center justify-center">
                    <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
                      <circle cx="30" cy="22" r="10" stroke="#C9943A" strokeWidth="1" />
                      <path d="M 10 55 C 10 40 20 35 30 35 C 40 35 50 40 50 55" stroke="#C9943A" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="font-cormorant text-2xl font-light text-[#FFFEF9] mb-2">{a.name}</h3>
                  <p className="font-inter text-xs tracking-[0.2em] uppercase text-[#C9943A] mb-4">{a.role}</p>
                  <div className="w-8 h-px bg-[#C9943A]/40 mx-auto mb-4" />
                  <p className="font-inter text-sm text-[#FAF8F4]/50">{a.years} of craft</p>
                  <p className="font-inter text-xs text-[#FAF8F4]/40">{a.area}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FAF8F4] text-center">
        <AnimatedSection>
          <h2 className="font-cormorant text-5xl font-light text-[#2C1810] mb-6">
            Wear a Piece of History
          </h2>
          <p className="font-inter text-sm text-[#2C1810]/60 mb-10 max-w-md mx-auto">
            Every purchase supports the artisans and helps keep this 400-year-old craft alive.
          </p>
          <Link to="/shop" className="btn-gold-filled">
            Explore Collections
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default About;
