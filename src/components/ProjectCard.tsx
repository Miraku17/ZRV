import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../data/portfolio';
import { EASE } from '../lib/animations';
import { Lightbox } from './Lightbox';

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Resolve a preview URL for a project:
 *  1. static `image` if provided
 *  2. live screenshot via Microlink for projects with a `link`
 *  3. null → monogram fallback
 */
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

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isFeatured = project.tier === 'Featured';
  const previewUrl = !errored ? getPreviewUrl(project) : null;
  const monogram = getMonogram(project.title);
  const gallery = project.images ?? [];
  const hasGallery = gallery.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, ease: EASE, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -4 }}
      className="group relative flex h-full cursor-default flex-col overflow-hidden border border-white/10 bg-transparent transition-[border-color,background-color] duration-[350ms] ease-in-out hover:border-white/25 hover:bg-white/[0.03]"
    >
      {/* Preview area */}
      <div
        className={`relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-white/[0.02] ${
          hasGallery ? 'cursor-zoom-in' : ''
        }`}
        onClick={hasGallery ? () => setLightboxIndex(0) : undefined}
        role={hasGallery ? 'button' : undefined}
        aria-label={hasGallery ? `View ${project.title} gallery` : undefined}
      >
        {previewUrl ? (
          <>
            {/* Loading shimmer */}
            {!loaded && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent" />
            )}
            <img
              src={previewUrl}
              alt={`${project.title} preview`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setErrored(true)}
              className={`h-full w-full object-cover object-top grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_60%)]">
            <span className="font-serif text-6xl font-black leading-none text-white/15 transition-colors duration-500 group-hover:text-white/25">
              {monogram}
            </span>
          </div>
        )}

        {/* Top vignette fade so the image blends with the card */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Gallery badge — signals the preview is clickable */}
        {hasGallery && (
          <span className="pointer-events-none absolute right-2.5 top-2.5 flex items-center gap-1 border border-white/15 bg-black/40 px-2 py-0.5 font-sans text-[0.6rem] uppercase tracking-[0.12em] text-white/70 backdrop-blur-sm transition-colors duration-300 group-hover:border-white/35">
            ⤢ {gallery.length}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-5 p-8">
        {/* Tier label + index */}
        <div className="flex items-center justify-between">
          <span
            className={`border px-2 py-0.5 font-sans text-[0.6rem] uppercase tracking-[0.2em] ${
              isFeatured ? 'border-white/30 text-white/70' : 'border-white/10 text-white/25'
            }`}
          >
            {project.tier}
          </span>
          <span className="font-serif text-[0.9rem] italic text-white/10">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="font-serif text-[1.4rem] font-bold leading-tight -tracking-[0.01em] text-white/85 transition-colors duration-300 group-hover:text-white">
          {project.title}
        </h3>

        <p className="flex-1 font-sans text-[0.85rem] font-light leading-[1.75] text-white/40">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
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
          <div className="mt-1 flex gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-current pb-[1px] font-sans text-[0.7rem] uppercase tracking-[0.12em] text-white/50 no-underline transition-colors duration-300 group-hover:text-white"
              >
                Live ↗
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-current pb-[1px] font-sans text-[0.7rem] uppercase tracking-[0.12em] text-white/30 no-underline transition-colors duration-300 hover:text-white"
              >
                Source ↗
              </a>
            )}
          </div>
        )}
      </div>

      {hasGallery && lightboxIndex !== null && (
        <Lightbox
          images={gallery}
          index={lightboxIndex}
          title={project.title}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </motion.div>
  );
};
