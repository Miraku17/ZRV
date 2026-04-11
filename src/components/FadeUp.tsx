import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../lib/animations';

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeUp: React.FC<FadeUpProps> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    custom={delay / 1000}
    variants={fadeUp}
  >
    {children}
  </motion.div>
);
