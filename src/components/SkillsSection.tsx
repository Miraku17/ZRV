import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../data/portfolio';
import { TECH_ROW1, TECH_ROW2 } from '../data/tech';
import { FadeUp } from './FadeUp';
import { SectionBackground } from './SectionBackground';
import { SectionHeader } from './SectionHeader';
import { TechMarquee } from './TechMarquee';

export const SkillsSection: React.FC = () => {
  const categories = [...new Set(SKILLS.map((s) => s.category))];

  return (
    <section
      id="Skills"
      className="relative overflow-hidden border-t border-white/[0.06] bg-black py-20 md:py-32"
    >
      <SectionBackground variant="bottom-left" />
      <div className="relative z-10 mx-auto max-w-[1000px] px-5 md:px-8">
        <SectionHeader eyebrow="04 / Skills" title="Capabilities" />

        {/* Skill pills by category */}
        <div className="mb-20 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-y-10 gap-x-12">
          {categories.map((cat, ci) => (
            <FadeUp key={cat} delay={ci * 80}>
              <div>
                <h3 className="mb-4 border-b border-white/10 pb-2.5 font-sans text-[0.6rem] uppercase tracking-[0.25em] text-white/30">
                  {cat}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS.filter((s) => s.category === cat).map((skill) => (
                    <motion.span
                      key={skill.name}
                      whileHover={{
                        borderColor: 'rgba(255,255,255,0.35)',
                        color: '#fff',
                        backgroundColor: 'rgba(255,255,255,0.04)',
                      }}
                      className="cursor-default border border-white/10 px-2.5 py-1 font-sans text-[0.7rem] tracking-[0.06em] text-white/55 transition-[border-color,color,background-color] duration-200"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Full-width tech logo marquee */}
      <FadeUp>
        <div className="flex flex-col gap-4">
          <TechMarquee items={TECH_ROW1} />
          <TechMarquee items={TECH_ROW2} reverse />
        </div>
      </FadeUp>
    </section>
  );
};
