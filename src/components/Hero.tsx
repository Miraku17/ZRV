import React from 'react';
import { motion } from 'framer-motion';
import DecryptedText from './DecryptedText/DecryptedText';
import { CRTWarp } from './CRTWarp/CRTWarp';
import { useTypewriter } from '../hooks/useTypewriter';
import { EASE, heroContainer, heroItem } from '../lib/animations';

const FULL_TITLE = 'Full Stack Developer\n& Security Engineer';

export const Hero: React.FC = () => {
  const title = useTypewriter(FULL_TITLE, 45, 900);
  const lines = title.split('\n');

  return (
    <section
      id="About"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-5 pb-12 pt-24 md:px-8 md:pb-16 md:pt-32"
    >
      {/* CRT Warp background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0"
      >
        <CRTWarp
          color="#a78bfa"
          backgroundColor="#000000"
          brightness={0.65}
          bloom={0.85}
          noise={0.03}
          vignette={0.78}
          rgbShift={0.003}
          mouseStrength={0.3}
        />
      </motion.div>

      {/* Scrim for text legibility over the animated background */}
      <div className="absolute inset-0 z-[1] bg-black/35" />

      {/* Large decorative ZRV */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-24 -translate-y-1/2 select-none font-serif text-[50vw] font-black leading-none -tracking-[0.05em] text-transparent opacity-70 md:-right-8 md:text-[28vw] md:opacity-100"
        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.04)' }}
      >
        ZRV
      </motion.div>

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[900px]"
      >
        {/* Eyebrow */}
        <motion.div variants={heroItem} className="mb-8 flex items-center gap-4">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
            className="h-px w-10 origin-left bg-white"
          />
          <span className="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-white/50">
            <DecryptedText
              text="Hi, I'm"
              animateOn="view"
              sequential={true}
              revealDirection="start"
              speed={60}
              encryptedClassName="decrypt-scrambled"
            />
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.42 }}
          className="mb-8 font-serif text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] -tracking-[0.03em] text-white"
        >
          <DecryptedText
            text="Zian Rinzler"
            animateOn="view"
            sequential={true}
            revealDirection="start"
            speed={38}
            className="decrypt-revealed"
            encryptedClassName="decrypt-scrambled"
          />
          <br />
          <DecryptedText
            text="Valles"
            animateOn="view"
            sequential={true}
            revealDirection="start"
            speed={38}
            className="decrypt-revealed"
            encryptedClassName="decrypt-scrambled"
          />
        </motion.h1>

        {/* Typewriter title */}
        <motion.div
          variants={heroItem}
          className="mb-12 min-h-[3.5rem] border-l-2 border-white/30 pl-6 font-sans text-[clamp(1rem,2.5vw,1.5rem)] font-light leading-relaxed tracking-[0.01em] text-white/60"
        >
          {lines.map((line, i) => (
            <span key={i} className={`block ${i === 1 ? 'font-serif italic text-white/80' : ''}`}>
              {line}
              {i === lines.length - 1 && title.length < FULL_TITLE.length && (
                <span className="ml-[2px] inline-block h-[1.2em] w-[2px] animate-blink align-text-bottom bg-white" />
              )}
            </span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={heroItem}
          className="mb-12 max-w-[560px] font-sans text-base font-light leading-[1.8] text-white/75"
        >
          Building scalable systems at the intersection of software engineering and cybersecurity,
          with 3+ years shipping production-ready applications. Currently a SOC Analyst at EY GDS
          Philippines, freelancing as a full-stack developer on the side.
        </motion.p>

        {/* CTA row */}
        <motion.div variants={heroItem} className="flex flex-wrap items-center gap-4">
          <motion.a
            href="#Contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('Contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block border border-white bg-white px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.15em] text-black no-underline transition-colors duration-300 hover:bg-black hover:text-white"
          >
            Get in Touch
          </motion.a>
          <motion.a
            href="https://github.com/Miraku17"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block border border-white/20 bg-transparent px-8 py-3.5 font-sans text-xs font-normal uppercase tracking-[0.15em] text-white/60 no-underline transition-colors duration-300 hover:border-white hover:text-white"
          >
            GitHub ↗
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={heroItem}
          className="mt-12 flex flex-wrap gap-7 border-t border-white/10 pt-8 md:mt-20 md:gap-12"
        >
          {(
            [
              ['9+', 'Projects Shipped'],
              ['5+', 'Years Building'],
              ['2', 'Active Roles'],
            ] as const
          ).map(([num, label]) => (
            <div key={label}>
              <div className="font-serif text-4xl font-black leading-none text-white">{num}</div>
              <div className="mt-1.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white/35">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <div className="h-10 w-px animate-scroll-bar bg-white/20" />
      </motion.div>
    </section>
  );
};
