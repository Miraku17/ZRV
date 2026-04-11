import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data/portfolio';
import { EASE } from '../lib/animations';
import { SectionHeader } from './SectionHeader';

export const ExperienceSection: React.FC = () => (
  <section
    id="Experience"
    className="border-t border-white/[0.06] bg-black px-5 py-20 md:px-8 md:py-32"
  >
    <div className="mx-auto max-w-[1000px]">
      <SectionHeader eyebrow="02 / Experience" title="Work History" />

      <div className="relative border-l border-white/10 pl-8">
        {EXPERIENCE.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
            className={`relative pl-8 ${i < EXPERIENCE.length - 1 ? 'pb-14' : ''}`}
          >
            {/* Dot */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 + 0.2 }}
              className={`absolute top-[0.4rem] -left-[2.55rem] rounded-full ${
                exp.active
                  ? 'h-2.5 w-2.5 bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.08)]'
                  : 'h-1.5 w-1.5 bg-white/25'
              }`}
            />

            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="mb-1 font-serif text-xl font-bold -tracking-[0.01em] text-white">
                  {exp.role}
                </h3>
                <div className="font-sans text-[0.8rem] italic text-white/50">{exp.company}</div>
              </div>
              <div className="flex items-center gap-3">
                {exp.active && (
                  <span className="inline-flex items-center gap-1.5 border border-white/20 px-3 py-0.5 font-sans text-[0.6rem] uppercase tracking-[0.15em] text-white/60">
                    <span className="inline-block h-[5px] w-[5px] animate-blink-slow rounded-full bg-white" />
                    Active
                  </span>
                )}
                <span className="font-sans text-xs tracking-[0.05em] text-white/30">
                  {exp.period}
                </span>
              </div>
            </div>

            <p className="mb-4 max-w-[600px] font-sans text-[0.9rem] font-light leading-[1.8] text-white/45">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {exp.tools.map((tool) => (
                <span
                  key={tool}
                  className="border border-white/10 px-2.5 py-1 font-sans text-[0.65rem] uppercase tracking-[0.1em] text-white/40"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
