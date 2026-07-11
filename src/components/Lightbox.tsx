import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../lib/animations';

interface LightboxProps {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-screen image viewer rendered into document.body so it escapes the
 * card's `overflow-hidden` clipping. Supports keyboard (←/→/Esc) and click nav.
 */
export const Lightbox: React.FC<LightboxProps> = ({
  images,
  index,
  title,
  onClose,
  onNavigate,
}) => {
  const count = images.length;
  const go = useCallback(
    (delta: number) => onNavigate((index + delta + count) % count),
    [index, count, onNavigate]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    // Prevent background scroll while open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [go, onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Close */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-white/15 text-white/60 transition-colors duration-300 hover:border-white/40 hover:text-white"
        >
          ✕
        </button>

        {/* Prev */}
        {count > 1 && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-3 sm:left-6 z-10 flex h-12 w-12 items-center justify-center border border-white/15 text-xl text-white/60 transition-colors duration-300 hover:border-white/40 hover:text-white"
          >
            ‹
          </button>
        )}

        {/* Image */}
        <motion.img
          key={index}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: EASE }}
          src={images[index]}
          alt={`${title} — image ${index + 1} of ${count}`}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[85vh] max-w-[90vw] object-contain border border-white/10 shadow-2xl"
        />

        {/* Next */}
        {count > 1 && (
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-3 sm:right-6 z-10 flex h-12 w-12 items-center justify-center border border-white/15 text-xl text-white/60 transition-colors duration-300 hover:border-white/40 hover:text-white"
          >
            ›
          </button>
        )}

        {/* Caption + counter */}
        <div className="pointer-events-none absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1">
          <span className="font-serif text-sm italic text-white/70">{title}</span>
          {count > 1 && (
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-white/40">
              {index + 1} / {count}
            </span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
