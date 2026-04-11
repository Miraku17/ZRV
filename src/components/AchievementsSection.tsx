import React from 'react';
import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '../data/portfolio';
import { EASE } from '../lib/animations';
import { SectionHeader } from './SectionHeader';

export const AchievementsSection: React.FC = () => (
  <section
    id="Achievements"
    className="border-t border-white/[0.06] bg-[#050505] px-5 py-20 md:px-8 md:py-32"
  >
    <div className="mx-auto max-w-[1000px]">
      <SectionHeader eyebrow="05 / Recognition" title="Achievements" />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-0.5 bg-white/[0.06]">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
            className="border-t-2 border-white/15 bg-[#050505] p-10"
          >
            <div className="mb-6 font-serif text-5xl font-black leading-none text-white/[0.08]">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="mb-3 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/30">
              {a.year}
            </div>
            <h3 className="mb-4 font-serif text-[1.4rem] font-bold leading-tight -tracking-[0.01em] text-white">
              {a.title}
            </h3>
            <p className="font-sans text-[0.85rem] font-light leading-[1.7] text-white/40">
              {a.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
