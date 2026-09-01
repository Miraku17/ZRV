import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Project } from '../data/portfolio';
import { EASE } from '../lib/animations';
import { FadeUp } from './FadeUp';

interface FeaturedShowcaseProps {
  projects: Project[];
}

const getPreviewUrl = (project: Project): string | null => {
  if (project.image) return project.image;
  if (project.link) {
    const encoded = encodeURIComponent(project.link);
    return `https://api.microlink.io/?url=${encoded}&screenshot=true&meta=false&embed=screenshot.url`;
  }
  return null;
};

const getMonogram = (title: string): string =>
  title
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join('')
    .slice(0, 2)
    .toUpperCase();

const FeaturedRow: React.FC<{ project: Project; index: number; reverse: boolean }> = ({
  project,
  index,
  reverse,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const previewUrl = getPreviewUrl(project);
  const monogram = getMonogram(project.title);
  const words = project.title.split(' ');
  const accent = words[words.length - 1];
  const lead = words.slice(0, -1).join(' ');

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
        reverse ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative aspect-[4/5] max-w-[420px] overflow-hidden rounded-[3rem] bg-white/[0.03] md:rounded-[4rem]"
      >
        {previewUrl ? (
          <motion.img
            src={previewUrl}
            alt={`${project.title} preview`}
            loading="lazy"
            style={{ y }}
            className="absolute inset-0 h-[125%] w-full -translate-y-[10%] object-cover object-top grayscale"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_60%)]">
            <span className="font-serif text-8xl font-black leading-none text-white/15">
              {monogram}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      <FadeUp delay={120}>
        <div>
          <span className="font-sans text-[0.75rem] uppercase tracking-[0.3em] text-white/25">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] font-black leading-[0.95] -tracking-[0.02em] text-white">
            {lead && `${lead} `}
            <span className="font-normal italic text-white/60">{accent}</span>
          </h3>
          <p className="mt-6 max-w-[440px] font-sans text-[0.95rem] font-light leading-[1.8] text-white/55">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="border border-white/10 bg-white/5 px-2 py-0.5 font-sans text-[0.6rem] uppercase tracking-[0.08em] text-white/35"
              >
                {t}
              </span>
            ))}
          </div>
          {(project.link || project.repo) && (
            <div className="mt-6 flex gap-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-current pb-[1px] font-sans text-[0.75rem] uppercase tracking-[0.12em] text-white/60 no-underline transition-colors duration-300 hover:text-white"
                >
                  Live ↗
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-current pb-[1px] font-sans text-[0.75rem] uppercase tracking-[0.12em] text-white/40 no-underline transition-colors duration-300 hover:text-white"
                >
                  Source ↗
                </a>
              )}
            </div>
          )}
        </div>
      </FadeUp>
    </div>
  );
};

export const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({ projects }) => (
  <div className="mb-20 flex flex-col gap-24 md:mb-32 md:gap-40">
    {projects.map((project, i) => (
      <FeaturedRow key={project.id} project={project} index={i} reverse={i % 2 === 1} />
    ))}
  </div>
);
