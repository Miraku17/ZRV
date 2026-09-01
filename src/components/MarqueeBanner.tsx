import React from 'react';
import { FadeUp } from './FadeUp';

interface MarqueeBannerProps {
  upright: string;
  italic: string;
  reverse?: boolean;
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  upright,
  italic,
  reverse = false,
}) => {
  const items = Array.from({ length: 6 });
  const doubled = [...items, ...items];

  return (
    <FadeUp>
      <div className="overflow-hidden border-y border-white/10 bg-black py-8 md:py-14">
        <div
          className={`flex w-max items-baseline gap-14 md:gap-20 ${reverse ? 'marquee-reverse' : 'marquee-forward'}`}
        >
          {doubled.map((_, i) => (
            <span
              key={i}
              className="flex items-baseline gap-5 whitespace-nowrap font-serif text-[clamp(3.5rem,11vw,8.5rem)] font-black uppercase leading-none -tracking-[0.02em] text-white/90 md:gap-8"
            >
              <span>{upright}</span>
              <span className="font-normal italic text-white/40">{italic}</span>
            </span>
          ))}
        </div>
      </div>
    </FadeUp>
  );
};
