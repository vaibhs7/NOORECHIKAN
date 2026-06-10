import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { categories, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import AnimatedSection from '../components/AnimatedSection';

/* ─── Hero Embroidery SVG ─────────────────────────────────── */
const EmbroideryHero = () => {
  const paths = [
    // Central large flower
    "M 300 250 C 300 250 280 210 300 180 C 320 150 340 180 320 210 C 310 225 300 250 300 250 Z",
    "M 300 250 C 300 250 270 240 250 215 C 230 190 255 170 275 195 C 287 210 300 250 300 250 Z",
    "M 300 250 C 300 250 290 220 270 210 C 250 200 240 220 255 235 C 267 247 300 250 300 250 Z",
    "M 300 250 C 300 250 315 220 340 215 C 365 210 370 235 350 240 C 335 244 300 250 300 250 Z",
    "M 300 250 C 300 250 330 240 345 260 C 360 280 340 300 320 285 C 308 276 300 250 300 250 Z",
    "M 300 250 C 300 250 285 280 280 305 C 275 330 295 340 310 320 C 320 307 300 250 300 250 Z",
    "M 300 250 C 300 250 275 270 260 290 C 245 310 255 330 275 320 C 290 312 300 250 300 250 Z",
    "M 300 250 C 300 250 320 275 335 295 C 350 315 340 330 325 318 C 314 310 300 250 300 250 Z",
    // Center circle
    "M 300 250 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0",
    // Stem left
    "M 300 250 C 270 300 230 320 190 340 C 160 355 140 380 120 410",
    // Stem right
    "M 300 250 C 330 300 370 320 410 340 C 440 355 460 380 480 410",
    // Left leaf on stem
    "M 200 320 C 180 300 155 295 145 310 C 135 325 150 345 175 338 C 190 334 200 320 200 320 Z",
    "M 200 320 C 185 335 178 355 185 368 C 192 381 210 378 215 363 C 218 352 200 320 200 320 Z",
    // Right leaf on stem
    "M 400 320 C 420 300 445 295 455 310 C 465 325 450 345 425 338 C 410 334 400 320 400 320 Z",
    "M 400 320 C 415 335 422 355 415 368 C 408 381 390 378 385 363 C 382 352 400 320 400 320 Z",
    // Small flowers top-left
    "M 175 155 C 175 155 160 135 175 115 C 190 95 205 115 190 135 C 183 145 175 155 175 155 Z",
    "M 175 155 C 175 155 155 148 145 130 C 135 112 152 100 165 118 C 171 130 175 155 175 155 Z",
    "M 175 155 C 175 155 162 168 150 175 C 138 182 128 170 140 160 C 148 154 175 155 175 155 Z",
    "M 175 155 C 175 155 190 165 200 175 C 210 185 205 198 193 190 C 184 184 175 155 175 155 Z",
    "M 175 155 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0",
    // Small flowers top-right
    "M 425 155 C 425 155 440 135 425 115 C 410 95 395 115 410 135 C 417 145 425 155 425 155 Z",
    "M 425 155 C 425 155 445 148 455 130 C 465 112 448 100 435 118 C 429 130 425 155 425 155 Z",
    "M 425 155 C 425 155 438 168 450 175 C 462 182 472 170 460 160 C 452 154 425 155 425 155 Z",
    "M 425 155 C 425 155 410 165 400 175 C 390 185 395 198 407 190 C 416 184 425 155 425 155 Z",
    "M 425 155 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0",
    // Vine left
    "M 120 410 C 100 430 90 460 95 490 C 100 510 115 515 125 500 C 130 490 120 410 120 410",
    "M 95 490 C 75 500 60 520 65 540 C 70 555 85 558 95 545",
    // Vine right
    "M 480 410 C 500 430 510 460 505 490 C 500 510 485 515 475 500 C 470 490 480 410 480 410",
    "M 505 490 C 525 500 540 520 535 540 C 530 555 515 558 505 545",
    // Decorative dots trail (small circles)
    "M 155 240 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0",
    "M 445 240 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0",
    "M 300 100 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0",
    "M 300 400 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0",
    // Corner ornaments
    "M 80 80 L 80 110 M 80 80 L 110 80 M 80 80 L 100 100",
    "M 520 80 L 520 110 M 520 80 L 490 80 M 520 80 L 500 100",
    "M 80 500 L 80 470 M 80 500 L 110 500 M 80 500 L 100 480",
    "M 520 500 L 520 470 M 520 500 L 490 500 M 520 500 L 500 480",
    // Extra vine flourishes
    "M 140 200 C 125 185 115 165 125 150 C 135 135 155 140 155 160 C 155 172 140 200 140 200 Z",
    "M 460 200 C 475 185 485 165 475 150 C 465 135 445 140 445 160 C 445 172 460 200 460 200 Z",
  ];

  return (
    <svg
      viewBox="60 60 480 480"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((d, i) => {
        const length = 300 + Math.random() * 200;
        return (
          <motion.path
            key={i}
            d={d}
            stroke={i % 5 === 0 ? '#B8860B' : '#C9943A'}
            strokeWidth={i < 9 || (i >= 19 && i < 24) ? 1.5 : 1}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: i % 7 === 0 ? 0.5 : 0.8 }}
            transition={{
              pathLength: {
                duration: 1.5 + i * 0.15,
                ease: 'easeInOut',
                delay: i * 0.08,
              },
              opacity: { duration: 0.3, delay: i * 0.08 },
            }}
          />
        );
      })}
    </svg>
  );
};

/* ─── Scroll Embroidery Section ───────────────────────────── */
const ScrollEmbroidery = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const motifPaths = [
    "M 200 200 C 200 200 175 160 200 130 C 225 100 250 130 225 160 C 212 177 200 200 200 200 Z",
    "M 200 200 C 200 200 160 190 140 160 C 120 130 148 110 170 140 C 183 158 200 200 200 200 Z",
    "M 200 200 C 200 200 185 165 160 155 C 135 145 125 168 145 180 C 160 190 200 200 200 200 Z",
    "M 200 200 C 200 200 220 165 250 155 C 280 145 285 175 260 182 C 244 187 200 200 200 200 Z",
    "M 200 200 C 200 200 235 185 248 210 C 261 235 238 258 218 242 C 206 232 200 200 200 200 Z",
    "M 200 200 C 200 200 188 230 185 260 C 182 290 200 300 215 278 C 224 263 200 200 200 200 Z",
    "M 200 200 C 200 200 168 218 155 245 C 142 272 158 292 178 277 C 192 266 200 200 200 200 Z",
    "M 200 200 C 200 200 218 225 235 248 C 252 271 242 290 226 275 C 215 264 200 200 200 200 Z",
    "M 200 200 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0",
    "M 200 200 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0",
    // vines
    "M 200 270 C 180 300 155 315 135 340 C 120 360 115 385 120 410",
    "M 200 270 C 220 300 245 315 265 340 C 280 360 285 385 280 410",
    // side leaves
    "M 145 320 C 125 305 108 300 102 315 C 96 330 115 348 138 338 C 152 332 145 320 145 320 Z",
    "M 255 320 C 275 305 292 300 298 315 C 304 330 285 348 262 338 C 248 332 255 320 255 320 Z",
    // top flourishes
    "M 145 145 C 128 125 118 102 130 90 C 142 78 162 88 155 108 C 150 120 145 145 145 145 Z",
    "M 255 145 C 272 125 282 102 270 90 C 258 78 238 88 245 108 C 250 120 255 145 255 145 Z",
  ];

  return (
    <section ref={ref} className="relative py-32 bg-[#FFFEF9] overflow-hidden grain-overlay">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* SVG */}
          <motion.div style={{ opacity }} className="relative flex justify-center">
            <svg viewBox="80 60 240 380" className="w-full max-w-sm" fill="none">
              {motifPaths.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  stroke={i % 4 === 0 ? '#B8860B' : '#C9943A'}
                  strokeWidth={i < 10 ? 1.5 : 1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ pathLength }}
                  opacity={i % 5 === 0 ? 0.6 : 0.9}
                />
              ))}
            </svg>
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-[#C9943A]/5 to-transparent pointer-events-none" />
          </motion.div>

          {/* Text */}
          <div className="space-y-8">
            <AnimatedSection delay={0.1}>
              <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#C9943A]">The Art of Chikankari</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h2 className="font-cormorant text-5xl lg:text-6xl font-light text-[#2C1810] leading-tight">
                Each Thread<br />
                <em className="text-[#C9943A]">Tells a Story</em>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="w-16 h-px bg-[#C9943A]" />
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <p className="font-inter text-base text-[#2C1810]/70 leading-relaxed">
                Over 36 distinct stitches, each with its own name, technique, and soul. Chikankari is not merely embroidery — it is a language spoken by the hands of Lucknow's master artisans, passed down through generations since the Mughal era.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.5}>
              <p className="font-cormorant text-2xl italic text-[#C9943A] font-light">
                "36 stitches, centuries of wisdom"
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.6}>
              <Link to="/about" className="btn-gold inline-flex">
                Discover Our Story
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Collections Grid ────────────────────────────────────── */
const CollectionsGrid = () => {
  const collectionData = [
    { id: 'kurtas', name: 'Kurtas', desc: 'Timeless elegance in every thread', color: 'from-amber-900 via-amber-800 to-orange-900', accent: '#8B4513' },
    { id: 'sarees', name: 'Sarees', desc: 'Six yards of heritage and grace', color: 'from-emerald-900 via-teal-800 to-green-900', accent: '#2D5016' },
    { id: 'dupattas', name: 'Dupattas', desc: 'The finishing touch of artistry', color: 'from-indigo-900 via-purple-800 to-violet-900', accent: '#3B2D6B' },
    { id: 'suit-sets', name: 'Suit Sets', desc: 'Complete ensembles of Nawabi splendor', color: 'from-rose-900 via-red-800 to-pink-900', accent: '#6B1A2D' },
    { id: 'kurtis', name: 'Kurtis', desc: 'Everyday luxury, effortlessly worn', color: 'from-slate-800 via-gray-700 to-zinc-800', accent: '#3D3D3D' },
  ];

  return (
    <section className="py-24 bg-[#FAF8F4] grain-overlay">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-4">Curated for You</p>
          <h2 className="section-title">Explore the Craft</h2>
          <div className="gold-divider" />
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {collectionData.map((cat, i) => (
            <AnimatedSection key={cat.id} delay={i * 0.1}>
              <Link to={`/category/${cat.id}`} className="group block">
                <div className={`relative overflow-hidden aspect-[2/3] bg-gradient-to-b ${cat.color}`}>
                  {/* Decorative SVG */}
                  <svg viewBox="0 0 200 300" className="absolute inset-0 w-full h-full opacity-20" fill="none">
                    <circle cx="100" cy="150" r="60" stroke="white" strokeWidth="0.5" />
                    <circle cx="100" cy="150" r="35" stroke="white" strokeWidth="0.5" />
                    {[0, 60, 120, 180, 240, 300].map(a => (
                      <line key={a} x1="100" y1="150"
                        x2={100 + 60 * Math.cos(a * Math.PI / 180)}
                        y2={150 + 60 * Math.sin(a * Math.PI / 180)}
                        stroke="white" strokeWidth="0.3" />
                    ))}
                    <circle cx="100" cy="90" r="12" stroke="white" strokeWidth="0.5" />
                    <circle cx="140" cy="150" r="10" stroke="white" strokeWidth="0.5" />
                    <circle cx="100" cy="210" r="12" stroke="white" strokeWidth="0.5" />
                    <circle cx="60" cy="150" r="10" stroke="white" strokeWidth="0.5" />
                  </svg>

                  {/* Hover gold border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C9943A] transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="font-cormorant text-2xl text-white font-light mb-1">{cat.name}</h3>
                    <p className="font-inter text-[11px] text-white/60 mb-3 leading-relaxed hidden lg:block">{cat.desc}</p>
                    <span className="font-inter text-[10px] tracking-[0.25em] uppercase text-[#C9943A] flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                      Explore <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Stitches Section ────────────────────────────────────── */
const StitchesSection = () => {
  const stitches = [
    { name: 'Tepchi', desc: 'The running stitch — foundation of all Chikankari. Long, flowing strokes that create delicate lines and outlines across fabric.' },
    { name: 'Bakhiya', desc: 'Shadow work stitch worked from the reverse side, creating translucent, ghostly floral patterns that seem to float in the fabric.' },
    { name: 'Jaali', desc: 'Pulled threadwork that creates open-weave patterns, resembling fine lacework or the carved marble screens of Mughal monuments.' },
    { name: 'Murri', desc: 'Tiny knotted stitches resembling rice grains or dew drops, used to fill floral centers and create texture in petals.' },
    { name: 'Phanda', desc: 'Smaller than murri — minute round knots that add dimension and depth, like scattered seeds across a field of flowers.' },
    { name: 'Keel Kangan', desc: 'The nail-bangle stitch, one of the rarest in Chikankari. Creates bold dimensional chain patterns of exceptional complexity.' },
  ];

  return (
    <section className="py-24 bg-[#2C1810] grain-overlay">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-4">The Craft</p>
          <h2 className="font-cormorant text-5xl lg:text-6xl font-light text-[#FFFEF9] leading-tight">
            36 Stitches of Mastery
          </h2>
          <div className="w-24 h-px bg-[#C9943A] mx-auto mt-6" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stitches.map((s, i) => (
            <AnimatedSection key={s.name} delay={i * 0.08}>
              <div className="group border border-[#C9943A]/20 p-8 hover:border-[#C9943A] transition-all duration-400 cursor-default">
                <h3 className="font-cormorant text-3xl font-light text-[#FFFEF9] group-hover:text-[#C9943A] transition-colors duration-300 mb-4">
                  {s.name}
                </h3>
                <div className="w-8 h-px bg-[#C9943A]/40 group-hover:bg-[#C9943A] transition-colors duration-300 mb-4" />
                <p className="font-inter text-sm text-[#FAF8F4]/60 leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Timeline Section ───────────────────────────────────── */
const TimelineSection = () => {
  const events = [
    {
      period: '17th Century',
      title: 'The Mughal Origins',
      text: "Legend attributes Chikankari to Nur Jahan, the beloved empress of Emperor Jahangir. She is said to have introduced this delicate embroidery to the Mughal court in Lucknow, teaching the craft to local artisans as a form of royal patronage.",
    },
    {
      period: '18th Century',
      title: 'The Golden Age',
      text: "Under the Nawabs of Awadh, Chikankari flourished into its golden era. The Nawabi court's obsession with refinement elevated this craft to an art form, with hundreds of artisans employed in royal karkhanas (workshops) producing pieces of extraordinary beauty.",
    },
    {
      period: '19th Century',
      title: 'Through Resilience',
      text: "The dissolution of the Nawabi kingdom brought hardship, but the artisans persisted. Chikankari moved from royal workshops to domestic cottage industries, passing from mothers to daughters, preserving every stitch name and technique through oral tradition.",
    },
    {
      period: '21st Century',
      title: 'Noor-e-Chikan',
      text: "We carry this legacy forward. Noor-e-Chikan was born to honor the artisans of Lucknow — to ensure their craft not only survives but thrives in the modern world, connecting ancient hands to contemporary hearts across the globe.",
    },
  ];

  return (
    <section className="py-24 bg-[#FFFEF9] grain-overlay overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-20">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-4">Our Heritage</p>
          <h2 className="section-title">The History of Chikankari</h2>
          <div className="gold-divider" />
        </AnimatedSection>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#C9943A]/30 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16">
            {events.map((ev, i) => (
              <AnimatedSection key={i} delay={0.1} direction={i % 2 === 0 ? 'right' : 'left'}>
                <div className={`relative grid md:grid-cols-2 gap-8 items-center ${i % 2 === 0 ? '' : ''}`}>
                  {/* Content left or right */}
                  <div className={`${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                    <p className="font-inter text-xs tracking-[0.2em] uppercase text-[#C9943A] mb-2">{ev.period}</p>
                    <h3 className="font-cormorant text-3xl font-medium text-[#2C1810] mb-4">{ev.title}</h3>
                    <p className="font-inter text-sm text-[#2C1810]/70 leading-relaxed">{ev.text}</p>
                  </div>

                  {/* Gold dot on center line */}
                  <div className={`absolute left-1/2 top-6 -translate-x-1/2 hidden md:block`}>
                    <div className="w-4 h-4 rounded-full bg-[#C9943A] border-4 border-[#FFFEF9] shadow-sm" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Brand Story Section ────────────────────────────────── */
const BrandStorySection = () => (
  <section className="py-24 bg-[#2C1810] grain-overlay">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <AnimatedSection direction="right">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-6">Our Story</p>
          <h2 className="font-cormorant text-5xl lg:text-6xl font-light text-[#FFFEF9] leading-tight mb-8">
            From Lucknow,<br />
            <em className="text-[#C9943A]">With Love</em>
          </h2>
          <p className="font-inter text-base text-[#FAF8F4]/70 leading-relaxed mb-6">
            Noor-e-Chikan was founded with a singular mission: to shine light on the extraordinary artisans of Lucknow whose hands carry centuries of embroidered wisdom. We work directly with master karigars (craftsmen) in the ancient Chowk district, ensuring fair wages, dignified work, and the preservation of techniques that took generations to perfect.
          </p>
          <p className="font-inter text-base text-[#FAF8F4]/70 leading-relaxed mb-10">
            Every piece in our collection is a collaboration between the artisan's tradition and the contemporary woman's desire for beauty that means something — that comes from somewhere — that tells a story worth wearing.
          </p>
          <Link to="/about" className="inline-flex items-center gap-3 font-inter text-xs tracking-[0.2em] uppercase text-[#C9943A] hover:gap-5 transition-all duration-300">
            Meet Our Artisans <ArrowRight size={14} />
          </Link>
        </AnimatedSection>

        {/* Decorative right panel */}
        <AnimatedSection direction="left" delay={0.2}>
          <div className="relative">
            <div className="border border-[#C9943A]/30 p-10 text-center">
              <svg viewBox="0 0 300 300" className="w-full max-w-xs mx-auto opacity-60" fill="none">
                {/* Large decorative mandala */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => (
                  <g key={a} transform={`rotate(${a} 150 150)`}>
                    <line x1="150" y1="150" x2="150" y2="45" stroke="#C9943A" strokeWidth="0.5" />
                    <ellipse cx="150" cy="75" rx="6" ry="18" stroke="#C9943A" strokeWidth="0.5" />
                  </g>
                ))}
                <circle cx="150" cy="150" r="90" stroke="#C9943A" strokeWidth="0.5" />
                <circle cx="150" cy="150" r="60" stroke="#C9943A" strokeWidth="0.3" />
                <circle cx="150" cy="150" r="30" stroke="#C9943A" strokeWidth="0.5" />
                <circle cx="150" cy="150" r="8" stroke="#C9943A" strokeWidth="1" />
                <circle cx="150" cy="150" r="3" fill="#C9943A" />
              </svg>
              <blockquote className="font-cormorant text-2xl italic text-[#C9943A] font-light mt-6 leading-relaxed">
                "We do not make clothes. We make heirlooms."
              </blockquote>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

/* ─── Main Home Component ─────────────────────────────────── */
const Home = () => {
  const featuredProducts = products.slice(0, 6);
  const [particlePositions] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: Math.random() * 90 + 5,
      left: Math.random() * 90 + 5,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 4,
    }))
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen bg-[#FAF8F4] overflow-hidden grain-overlay flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F4] via-[#F5F0E8] to-[#EDE5D5]" />

        {/* Floating particles */}
        {particlePositions.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#C9943A]"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -15, -5, -20, 0],
              x: [0, 5, -5, 3, 0],
              opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* SVG embroidery - positioned as large background element */}
        <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
          <div className="w-[min(80vw,600px)] h-[min(80vw,600px)]">
            <EmbroideryHero />
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 text-center pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-inter text-xs tracking-[0.4em] uppercase text-[#C9943A] mb-8"
          >
            Est. in the lanes of Lucknow
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-cormorant text-7xl md:text-9xl lg:text-[10rem] font-light leading-none text-[#2C1810] mb-6"
          >
            <em className="text-[#C9943A] not-italic">Noor</em>
            <span className="text-[#2C1810]">-e-</span>
            <span className="text-[#2C1810]">Chikan</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="font-cormorant text-2xl md:text-3xl font-light italic text-[#C9943A] mb-4"
          >
            The Light of Chikankari
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="font-inter text-sm md:text-base text-[#2C1810]/60 tracking-wide mb-12 max-w-xl mx-auto"
          >
            Hand-embroidered heritage from the streets of Lucknow
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/shop" className="btn-gold-filled px-10 py-4 text-sm">
              Explore Collections
            </Link>
            <Link to="/about" className="btn-gold px-10 py-4 text-sm">
              Our Story
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-[#C9943A]/60"
            >
              <span className="font-inter text-[10px] tracking-[0.3em] uppercase">Scroll</span>
              <ChevronDown size={16} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scroll Embroidery Reveal */}
      <ScrollEmbroidery />

      {/* Collections Grid */}
      <CollectionsGrid />

      {/* Stitches Section */}
      <StitchesSection />

      {/* Timeline */}
      <TimelineSection />

      {/* Featured Products */}
      <section className="py-24 bg-[#FAF8F4] grain-overlay">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-4">New Arrivals</p>
            <h2 className="section-title">Featured Pieces</h2>
            <div className="gold-divider" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <AnimatedSection className="text-center mt-16">
            <Link to="/shop" className="btn-gold">
              View All Collections
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Brand Story */}
      <BrandStorySection />
    </>
  );
};

export default Home;
