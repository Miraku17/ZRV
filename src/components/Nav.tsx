import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS } from '../data/portfolio';
import { EASE } from '../lib/animations';
import { useActiveSection } from '../hooks/useActiveSection';

export const Nav: React.FC = () => {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const navBgClass =
    scrolled || menuOpen
      ? 'bg-black/95 border-white/10 backdrop-blur-md'
      : 'bg-transparent border-transparent';

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-[100] border-b px-5 transition-[background-color,border-color,backdrop-filter] duration-400 ease-in-out md:px-8 ${navBgClass}`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between">
          <a
            href="#About"
            onClick={(e) => handleNavClick(e, 'About')}
            className="relative z-[101] font-serif text-[1.1rem] font-bold tracking-[0.05em] text-white no-underline"
          >
            ZRV
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item;
              return (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`font-sans text-xs uppercase tracking-[0.15em] no-underline pb-[2px] border-b transition-all duration-300 ${
                    isActive
                      ? 'text-white border-white'
                      : 'text-white/40 border-transparent hover:text-white/70'
                  }`}
                >
                  {item}
                </a>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className={`nav-hamburger relative z-[101] block h-9 w-9 cursor-pointer border-0 bg-transparent p-2 md:hidden${
              menuOpen ? ' open' : ''
            }`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-7 bg-black/95 backdrop-blur-lg md:hidden"
          >
            {NAV_ITEMS.map((item, i) => {
              const isActive = active === item;
              return (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, item)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.05 + i * 0.04 }}
                  className={`font-sans text-[1.1rem] uppercase tracking-[0.25em] no-underline transition-colors ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
