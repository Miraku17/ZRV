import React from 'react';

export const Footer: React.FC = () => (
  <footer className="border-t border-white/[0.06] bg-black p-8 text-center">
    <div className="font-sans text-[0.7rem] tracking-[0.1em] text-white/20">
      Zian Rinzler Valles · {new Date().getFullYear()} · Built with React · Orb shader by{' '}
      <a
        href="https://x.com/XorDev"
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-white/10 underline-offset-2 transition-colors hover:text-white/50"
      >
        XorDev
      </a>
    </div>
  </footer>
);
