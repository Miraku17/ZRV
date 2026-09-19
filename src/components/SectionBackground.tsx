import React from 'react';

interface SectionBackgroundProps {
  variant?: 'top-left' | 'top-right' | 'center' | 'bottom-left';
}

const POSITION: Record<string, string> = {
  'top-left': '-top-40 -left-40',
  'top-right': '-top-40 -right-40',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'bottom-left': '-bottom-40 -left-40',
};

export const SectionBackground: React.FC<SectionBackgroundProps> = ({ variant = 'top-right' }) => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
        backgroundSize: '56px 56px',
      }}
    />
    <div
      className={`absolute h-[560px] w-[560px] rounded-full bg-[#8b5cf6] opacity-[0.07] blur-[140px] ${POSITION[variant]}`}
    />
  </div>
);
