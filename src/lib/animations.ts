export const EASE = [0.25, 0.1, 0.25, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

export const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

export const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};
