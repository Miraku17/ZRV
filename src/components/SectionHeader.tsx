import React from 'react';
import { FadeUp } from './FadeUp';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  /** Extra bottom margin classes override */
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  className = 'mb-12 md:mb-20',
}) => (
  <FadeUp>
    <div
      className={`flex flex-col items-start gap-3 md:flex-row md:items-baseline md:gap-8 ${className}`}
    >
      <span className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-white/30">
        {eyebrow}
      </span>
      <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-black leading-none -tracking-[0.02em] text-white">
        {title}
      </h2>
    </div>
  </FadeUp>
);
