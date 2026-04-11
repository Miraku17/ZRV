import React from 'react';
import { motion } from 'framer-motion';
import type { TechItem } from '../data/tech';

interface TechMarqueeProps {
  items: TechItem[];
  reverse?: boolean;
}

export const TechMarquee: React.FC<TechMarqueeProps> = ({ items, reverse = false }) => {
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className={`flex w-max gap-4 ${reverse ? 'marquee-reverse' : 'marquee-forward'}`}
      >
        {doubled.map((tech, i) => (
          <motion.div
            key={i}
            whileHover={{
              borderColor: 'rgba(255,255,255,0.3)',
              backgroundColor: 'rgba(255,255,255,0.05)',
            }}
            className="flex min-w-[82px] cursor-default flex-col items-center gap-2 border border-white/10 bg-white/[0.02] px-5 py-4"
          >
            <tech.Icon size={22} color="rgba(255,255,255,0.55)" />
            <span className="whitespace-nowrap font-sans text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
