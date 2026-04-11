import { useEffect, useState } from 'react';

export function useTypewriter(text: string, speed = 60, startDelay = 300): string {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return displayed;
}
