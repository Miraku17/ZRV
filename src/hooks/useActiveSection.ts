import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '../data/portfolio';

export function useActiveSection(): string {
  const [active, setActive] = useState<string>('About');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((id) => document.getElementById(id));
      const scrollPos = window.scrollY + 120;
      for (const section of [...sections].reverse()) {
        if (section && section.offsetTop <= scrollPos) {
          setActive(section.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return active;
}
