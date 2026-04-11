import React from 'react';
import { motion } from 'framer-motion';
import DecryptedText from './DecryptedText/DecryptedText';
import { LetterGlitch } from './LetterGlitch';
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
      {/* Letter Glitch background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0"
      >
        <LetterGlitch
          glitchColors={['#111111', '#1c1c1c', '#0d0d0d']}
          glitchSpeed={55}
          outerVignette
          centerVignette
          smooth
        />
      </motion.div>

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
          <div className="h-px w-10 bg-white" />
          <span className="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-white/50">
            Portfolio · 2025
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
          <span className="text-white/25">
            <DecryptedText
              text="Valles"
              animateOn="view"
              sequential={true}
              revealDirection="start"
              speed={38}
              className="decrypt-revealed-dim"
              encryptedClassName="decrypt-scrambled-dim"
            />
          </span>
        </motion.h1>

        {/* Typewriter title */}
        <motion.div
          variants={heroItem}
          className="mb-12 min-h-[3.5rem] border-l-2 border-white/30 pl-6 font-sans text-[clamp(1rem,2.5vw,1.5rem)] font-light leading-relaxed tracking-[0.01em] text-white/60"
        >
          {lines.map((line, i) => (
            <span key={i} className="block">
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
          className="mb-12 max-w-[560px] font-sans text-base font-light leading-[1.8] text-white/45"
        >
          Building scalable systems at the intersection of software engineering and cybersecurity.
          Currently at EY GDS Philippines — concurrently operating as a freelance developer.
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
        <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
          Scroll
        </span>
        <div className="h-10 w-px animate-scroll-bar bg-white/20" />
      </motion.div>
    </section>
  );
};
