import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DecryptedText from './components/DecryptedText/DecryptedText';
import {
  SiReact, SiNextdotjs, SiTypescript, SiVuedotjs, SiNodedotjs, SiPython,
  SiNestjs, SiLaravel, SiPhp, SiTailwindcss, SiPostgresql, SiMongodb,
  SiSupabase, SiFirebase, SiVercel, SiExpo, SiSqlite, SiGithub, SiGit,
} from 'react-icons/si';

// ─── LETTER GLITCH ────────────────────────────────────────────────────────────
const LetterGlitch = ({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
}: {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  characters?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<{ char: string; color: string; targetColor: string; colorProgress: number; }[]>([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());

  const lettersAndSymbols = Array.from(characters);
  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const getRandomChar = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)];

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
  };

  const interpolateColor = (start: { r: number; g: number; b: number }, end: { r: number; g: number; b: number }, factor: number) => {
    const result = { r: Math.round(start.r + (end.r - start.r) * factor), g: Math.round(start.g + (end.g - start.g) * factor), b: Math.round(start.b + (end.b - start.b) * factor) };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows };
    letters.current = Array.from({ length: columns * rows }, () => ({
      char: getRandomChar(), color: getRandomColor(), targetColor: getRandomColor(), colorProgress: 1,
    }));
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    if (context.current) context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    const columns = Math.ceil(rect.width / charWidth);
    const rows = Math.ceil(rect.height / charHeight);
    initializeLetters(columns, rows);
    drawLetters();
  };

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current!.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = 'top';
    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));
    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;
      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();
      if (!smooth) { letters.current[index].color = letters.current[index].targetColor; letters.current[index].colorProgress = 1; }
      else letters.current[index].colorProgress = 0;
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach(letter => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;
        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) { letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress); needsRedraw = true; }
      }
    });
    if (needsRedraw) drawLetters();
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) { updateLetters(); drawLetters(); lastGlitchTime.current = now; }
    if (smooth) handleSmoothTransitions();
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    context.current = canvas.getContext('2d');
    resizeCanvas();
    animate();
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => { cancelAnimationFrame(animationRef.current as number); resizeCanvas(); animate(); }, 100);
    };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animationRef.current!); window.removeEventListener('resize', handleResize); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#000000', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      {outerVignette && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)' }} />}
      {centerVignette && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)' }} />}
    </div>
  );
};

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Skill { name: string; level: number; category: string; }
interface Project { id: string; title: string; description: string; tech: string[]; tier: string; link?: string; repo?: string; }
interface Experience { role: string; company: string; period: string; description: string; tools: string[]; active: boolean; }
interface Achievement { title: string; year: string; description: string; }

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SKILLS: Skill[] = [
  { name: 'React / Next.js', level: 95, category: 'Frontend' },
  { name: 'React Native', level: 90, category: 'Frontend' },
  { name: 'Vue.js', level: 85, category: 'Frontend' },
  { name: 'Python', level: 85, category: 'Backend' },
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'Laravel / PHP', level: 75, category: 'Backend' },
  { name: 'NestJS', level: 70, category: 'Backend' },
  { name: 'SQL / NoSQL', level: 85, category: 'Database' },
  { name: 'Supabase', level: 85, category: 'Database' },
  { name: 'Automation', level: 80, category: 'Tools' },
  { name: 'SailPoint IAM', level: 70, category: 'Security' },
  { name: 'Claude Code', level: 90, category: 'AI' },
  { name: 'ChatGPT', level: 90, category: 'AI' },
  { name: 'Gemini', level: 85, category: 'AI' },
];

const PROJECTS: Project[] = [
  { id: '1', title: 'Buudl', description: 'As Software Engineer Leader, architected a second-hand fashion marketplace built for buying and selling pre-loved clothing. Cross-platform, real-time, production-scale.', tech: ['Next.js', 'Laravel', 'React Native', 'Tailwind'], tier: 'Featured' },
  { id: '2', title: 'ERP Cerventech', description: 'Enterprise ERP system with Row Level Security, real-time inventory management, and secure multi-role access control for complex business workflows.', tech: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind'], tier: 'Featured', link: 'https://erp.cerventech.com/', repo: 'https://github.com/Miraku17/CervenOTManagement' },
  { id: '3', title: 'PSI DEU TZ Service Pro', description: 'Power systems operations platform with form management, detailed report generation, and admin dashboard with Role-Based Access Control.', tech: ['Next.js', 'Supabase', 'Vercel'], tier: 'Client', link: 'https://psideutzservicepro.com/', repo: 'https://github.com/Miraku17/PowerSystems' },
  { id: '4', title: 'UNO-R Permit System', description: 'Automated exam permit system for UNO-R. Real-time payment status tracking, digital permit generation, and streamlined administrative workflows.', tech: ['Next.js', 'MongoDB', 'Node.js', 'Tailwind'], tier: 'Client', link: 'https://payco-uno-r.vercel.app/' },
  { id: '5', title: 'Courtify', description: 'Venue booking system for tennis and pickleball courts. Intuitive scheduling interface streamlining court reservations.', tech: ['Next.js', 'Supabase', 'Vercel'], tier: 'Personal', link: 'https://courtify.online/', repo: 'https://github.com/Miraku17/Courtly' },
  { id: '6', title: 'Doodle Museum', description: 'Interactive canvas where users create doodles and vote on favorites. Persistent profile system and real-time community gallery.', tech: ['Next.js', 'Supabase', 'Canvas API'], tier: 'Personal', link: 'https://doodle-museum.vercel.app/', repo: 'https://github.com/Miraku17/Doodle-Museum' },
  { id: '7', title: 'SerbisYOU', description: 'Home service booking platform revolutionizing local service connections via mobile. Real-time geolocation and service matching.', tech: ['React Native', 'Firebase', 'Google Maps API'], tier: 'Personal' },
  { id: '8', title: 'IDAS', description: 'Attendance tracking system built with React Native. High-performance local storage with SQLite and streamlined state management via Zustand.', tech: ['React Native', 'Expo', 'SQLite', 'Zustand'], tier: 'Personal', repo: 'https://github.com/Miraku17/IDAS' },
  { id: '9', title: 'Velocity Pickleball Cebu', description: 'Website for Velocity Pickleball Cebu showcasing their facility, court bookings, and community events.', tech: ['Next.js', 'Tailwind', 'Vercel'], tier: 'Client', link: 'https://velocitypickleballcebu.com/', repo: 'https://github.com/Miraku17/velocity-hub' },
];

const EXPERIENCE: Experience[] = [
  { role: 'SOC Analyst', company: 'EY GDS Philippines', period: '2025 — Present', description: 'Monitoring and analyzing security events across client environments, triaging alerts, and responding to potential threats to maintain a strong security posture.', tools: ['SIEM', 'Threat Detection', 'Incident Response', 'Log Analysis'], active: true },
  { role: 'IAM Cybersecurity Consultant', company: 'EY GDS Philippines', period: '2025 — Present', description: 'Specializing in Identity and Access Management cybersecurity solutions, ensuring secure access governance across enterprise environments.', tools: ['IAM', 'SailPoint', 'Security Audits', 'Consulting'], active: true },
  { role: 'Freelance Software Developer', company: 'Self-Employed', period: '2025 — Present', description: 'Building and delivering full-stack web applications for clients end-to-end — from requirements gathering to production deployment.', tools: ['Next.js', 'Supabase', 'Tailwind', 'Vercel'], active: true },
  { role: 'Junior Full Stack Developer', company: 'Wonita (Buudl)', period: 'Jul 2024 — Dec 2024', description: 'Developed core marketplace features, implemented real-time search, and built cross-platform mobile applications for a fashion resale startup.', tools: ['Next.js', 'React Native', 'Laravel'], active: false },
  { role: 'Software Developer Intern', company: 'Advanced World Solutions', period: 'Mar 2024 — Jun 2024', description: 'Created Python GUI applications and automation scripts using Robot Framework and Selenium for enterprise workflow automation.', tools: ['Python', 'Robot Framework', 'Selenium'], active: false },
  { role: 'Full Stack Developer', company: 'Freelance', period: '2020 — 2024', description: 'Delivered art commission platforms, exam permit systems, and various client projects across 4 years of independent consulting.', tools: ['Vue.js', 'Next.js', 'MongoDB'], active: false },
];

const ACHIEVEMENTS: Achievement[] = [
  { title: 'Cum Laude', year: '2024', description: 'Graduated with high honors in BS Computer Engineering, demonstrating sustained academic excellence.' },
  { title: 'Big 4 Placement', year: '2025', description: 'Secured dual roles at EY GDS Philippines — one of the world\'s Big 4 professional services firms.' },
  { title: 'Dual-Track Career', year: '2025', description: 'Operating simultaneously as a full-stack developer and cybersecurity professional — a rare technical breadth.' },
];

const NAV_ITEMS = ['About', 'Experience', 'Projects', 'Skills', 'Achievements', 'Contact'];

// ─── ANIMATION CONFIG ─────────────────────────────────────────────────────────
const EASE = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 60, startDelay = 300): string {
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


function useActiveSection(): string {
  const [active, setActive] = useState('About');
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(id => document.getElementById(id));
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

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => (
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

// ─── NAV ──────────────────────────────────────────────────────────────────────
const Nav: React.FC = () => {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: scrolled ? 'rgba(0,0,0,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        padding: '0 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        <a
          href="#About"
          style={{ fontFamily: '"Georgia", serif', fontSize: '1.1rem', fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.05em' }}
        >
          ZRV
        </a>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {NAV_ITEMS.map(item => (
            <a
              key={item}
              href={`#${item}`}
              onClick={e => { e.preventDefault(); document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: active === item ? '#fff' : 'rgba(255,255,255,0.4)',
                borderBottom: active === item ? '1px solid #fff' : '1px solid transparent',
                paddingBottom: '2px',
                transition: 'all 0.3s ease',
                fontFamily: '"Helvetica Neue", sans-serif',
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const Hero: React.FC = () => {
  const title = useTypewriter('Full Stack Developer\n& Security Engineer', 45, 900);
  const lines = title.split('\n');

  return (
    <section
      id="About"
      style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '8rem 2rem 4rem',
      }}
    >
      {/* Letter Glitch background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        <LetterGlitch
          glitchColors={['#111111', '#1c1c1c', '#0d0d0d']}
          glitchSpeed={55}
          outerVignette={true}
          centerVignette={true}
          smooth={true}
        />
      </motion.div>

      {/* Large decorative ZRV */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        style={{
          position: 'absolute', right: '-2rem', top: '50%', transform: 'translateY(-50%)',
          fontSize: '28vw', fontFamily: '"Georgia", serif', fontWeight: 900,
          color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
          letterSpacing: '-0.05em',
        }}
      >
        ZRV
      </motion.div>

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '900px', width: '100%', position: 'relative', zIndex: 1 }}
      >
        {/* Eyebrow */}
        <motion.div variants={heroItem} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#fff' }} />
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontFamily: '"Helvetica Neue", sans-serif' }}>
            Portfolio · 2025
          </span>
        </motion.div>

        {/* Name — no opacity fade so DecryptedText animation is immediately visible */}
        <motion.h1
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.42 }}
          style={{
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: '2rem',
          }}
        >
          <DecryptedText
            text="Zian Rinzler"
            animateOn="view"
            sequential={true}
            revealDirection="start"
            speed={38}
            className="decrypt-revealed"
            encryptedClassName="decrypt-scrambled"
          />
          <br />
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>
            <DecryptedText
              text="Valles"
              animateOn="view"
              sequential={true}
              revealDirection="start"
              speed={38}
              className="decrypt-revealed-dim"
              encryptedClassName="decrypt-scrambled-dim"
            />
          </span>
        </motion.h1>

        {/* Typewriter title */}
        <motion.div
          variants={heroItem}
          style={{
            fontFamily: '"Helvetica Neue", sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: 'rgba(255,255,255,0.6)',
            fontWeight: 300,
            letterSpacing: '0.01em',
            minHeight: '3.5rem',
            lineHeight: 1.6,
            borderLeft: '2px solid rgba(255,255,255,0.3)',
            paddingLeft: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {lines.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {line}
              {i === lines.length - 1 && title.length < 'Full Stack Developer\n& Security Engineer'.length && (
                <span style={{ display: 'inline-block', width: '2px', height: '1.2em', backgroundColor: '#fff', marginLeft: '2px', verticalAlign: 'text-bottom', animation: 'blink 1s step-end infinite' }} />
              )}
            </span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={heroItem}
          style={{
            fontFamily: '"Helvetica Neue", sans-serif',
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '560px',
            lineHeight: 1.8,
            marginBottom: '3rem',
            fontWeight: 300,
          }}
        >
          Building scalable systems at the intersection of software engineering and cybersecurity. Currently at EY GDS Philippines — concurrently operating as a freelance developer.
        </motion.p>

        {/* CTA row */}
        <motion.div variants={heroItem} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <motion.a
            href="#Contact"
            onClick={e => { e.preventDefault(); document.getElementById('Contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-block', padding: '0.875rem 2rem',
              backgroundColor: '#fff', color: '#000',
              fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.75rem',
              letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700,
              textDecoration: 'none', border: '1px solid #fff',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.backgroundColor = '#000'; (e.target as HTMLElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = '#fff'; (e.target as HTMLElement).style.color = '#000'; }}
          >
            Get in Touch
          </motion.a>
          <motion.a
            href="https://github.com/Miraku17"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-block', padding: '0.875rem 2rem',
              backgroundColor: 'transparent', color: 'rgba(255,255,255,0.6)',
              fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.75rem',
              letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 400,
              textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)',
              transition: 'border-color 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = '#fff'; (e.target as HTMLElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}
          >
            GitHub ↗
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={heroItem}
          style={{ display: 'flex', gap: '3rem', marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}
        >
          {[['9+', 'Projects Shipped'], ['5+', 'Years Building'], ['2', 'Active Roles']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: '"Georgia", serif', fontSize: '2.5rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: '0.4rem' }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
      >
        <span style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Scroll</span>
        <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)', animation: 'scrollBar 2s ease infinite' }} />
      </motion.div>
    </section>
  );
};

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
const ExperienceSection: React.FC = () => (
  <section id="Experience" style={{ backgroundColor: '#000', padding: '8rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <FadeUp>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '5rem' }}>
          <span style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>02 / Experience</span>
          <h2 style={{ fontFamily: '"Georgia", serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
            Work History
          </h2>
        </div>
      </FadeUp>

      <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
        {EXPERIENCE.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
            style={{
              position: 'relative',
              paddingBottom: i < EXPERIENCE.length - 1 ? '3.5rem' : 0,
              paddingLeft: '2rem',
            }}
          >
            {/* Dot */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 + 0.2 }}
              style={{
                position: 'absolute', left: '-2.55rem', top: '0.4rem',
                width: exp.active ? '10px' : '6px',
                height: exp.active ? '10px' : '6px',
                backgroundColor: exp.active ? '#fff' : 'rgba(255,255,255,0.25)',
                borderRadius: '50%',
                boxShadow: exp.active ? '0 0 0 4px rgba(255,255,255,0.08)' : 'none',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontFamily: '"Georgia", serif', fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>
                  {exp.role}
                </h3>
                <div style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
                  {exp.company}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {exp.active && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.2rem 0.75rem',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.6rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
                  }}>
                    <span style={{ width: '5px', height: '5px', backgroundColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'blink 2s ease infinite' }} />
                    Active
                  </span>
                )}
                <span style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
                  {exp.period}
                </span>
              </div>
            </div>

            <p style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: '1rem', maxWidth: '600px', fontWeight: 300 }}>
              {exp.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {exp.tools.map(tool => (
                <span key={tool} style={{
                  fontFamily: '"Helvetica Neue", sans-serif',
                  fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '0.25rem 0.6rem',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.4)',
                }}>
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, ease: EASE, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'}`,
        padding: '2rem',
        backgroundColor: hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        transition: 'border-color 0.35s ease, background-color 0.35s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Tier label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.6rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: project.tier === 'Featured' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)',
          padding: '0.2rem 0.5rem',
          border: `1px solid ${project.tier === 'Featured' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
        }}>
          {project.tier}
        </span>
        <span style={{ fontFamily: '"Georgia", serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.1)', fontStyle: 'italic' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 style={{
        fontFamily: '"Georgia", serif',
        fontSize: '1.4rem', fontWeight: 700,
        color: hovered ? '#fff' : 'rgba(255,255,255,0.85)',
        letterSpacing: '-0.01em', lineHeight: 1.2,
        transition: 'color 0.3s',
      }}>
        {project.title}
      </h3>

      <p style={{
        fontFamily: '"Helvetica Neue", sans-serif',
        fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75,
        fontWeight: 300, flex: 1,
      }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {project.tech.map(t => (
          <span key={t} style={{
            fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.6rem',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '0.2rem 0.5rem',
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.35)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {t}
          </span>
        ))}
      </div>

      {(project.link || project.repo) && (
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.7rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: hovered ? '#fff' : 'rgba(255,255,255,0.5)',
              textDecoration: 'none', borderBottom: '1px solid currentColor',
              transition: 'color 0.3s', paddingBottom: '1px',
            }}>
              Live ↗
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.7rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none', borderBottom: '1px solid currentColor',
              transition: 'color 0.3s', paddingBottom: '1px',
            }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
            onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.3)'}
            >
              Source ↗
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
};

const ProjectsSection: React.FC = () => (
  <section id="Projects" style={{ backgroundColor: '#000', padding: '8rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <FadeUp>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '5rem' }}>
          <span style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>03 / Work</span>
          <h2 style={{ fontFamily: '"Georgia", serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
            Selected Projects
          </h2>
        </div>
      </FadeUp>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {PROJECTS.map((project, i) => (
          <div key={project.id} style={{ backgroundColor: '#000' }}>
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── SKILLS ───────────────────────────────────────────────────────────────────
interface TechItem { name: string; Icon: React.ComponentType<{ size?: number; color?: string }> }

const TECH_ROW1: TechItem[] = [
  { name: 'React', Icon: SiReact },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Vue.js', Icon: SiVuedotjs },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Python', Icon: SiPython },
  { name: 'NestJS', Icon: SiNestjs },
  { name: 'Laravel', Icon: SiLaravel },
  { name: 'PHP', Icon: SiPhp },
  { name: 'Tailwind', Icon: SiTailwindcss },
];

const TECH_ROW2: TechItem[] = [
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'Supabase', Icon: SiSupabase },
  { name: 'Firebase', Icon: SiFirebase },
  { name: 'Vercel', Icon: SiVercel },
  { name: 'Expo', Icon: SiExpo },
  { name: 'SQLite', Icon: SiSqlite },
  { name: 'GitHub', Icon: SiGithub },
  { name: 'Git', Icon: SiGit },
];

const TechMarquee: React.FC<{ items: TechItem[]; reverse?: boolean }> = ({ items, reverse = false }) => {
  const doubled = [...items, ...items];
  return (
    <div style={{
      overflow: 'hidden',
      maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
    }}>
      <div
        className={reverse ? 'marquee-reverse' : 'marquee-forward'}
        style={{ display: 'flex', gap: '1rem', width: 'max-content' }}
      >
        {doubled.map((tech, i) => (
          <motion.div
            key={i}
            whileHover={{ borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.05)' }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
              padding: '1rem 1.25rem', minWidth: '82px',
              border: '1px solid rgba(255,255,255,0.08)',
              backgroundColor: 'rgba(255,255,255,0.02)',
              cursor: 'default',
            }}
          >
            <tech.Icon size={22} color="rgba(255,255,255,0.55)" />
            <span style={{
              fontFamily: '"Helvetica Neue", sans-serif',
              fontSize: '0.55rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
              whiteSpace: 'nowrap',
            }}>
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SkillsSection: React.FC = () => {
  const categories = [...new Set(SKILLS.map(s => s.category))];

  return (
    <section id="Skills" style={{ backgroundColor: '#000', padding: '8rem 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        <FadeUp>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '5rem' }}>
            <span style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>04 / Skills</span>
            <h2 style={{ fontFamily: '"Georgia", serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
              Capabilities
            </h2>
          </div>
        </FadeUp>

        {/* Skill pills by category */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2.5rem 3rem', marginBottom: '5rem' }}>
          {categories.map((cat, ci) => (
            <FadeUp key={cat} delay={ci * 80}>
              <div>
                <h3 style={{
                  fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.6rem',
                  letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)', marginBottom: '1rem',
                  paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}>
                  {cat}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {SKILLS.filter(s => s.category === cat).map(skill => (
                    <motion.span
                      key={skill.name}
                      whileHover={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff', backgroundColor: 'rgba(255,255,255,0.04)' }}
                      style={{
                        fontFamily: '"Helvetica Neue", sans-serif',
                        fontSize: '0.7rem', letterSpacing: '0.06em',
                        padding: '0.3rem 0.65rem',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.55)',
                        transition: 'border-color 0.2s, color 0.2s, background-color 0.2s',
                        cursor: 'default',
                      }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Full-width tech logo marquee */}
      <FadeUp>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TechMarquee items={TECH_ROW1} />
          <TechMarquee items={TECH_ROW2} reverse />
        </div>
      </FadeUp>
    </section>
  );
};

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────────────────
const AchievementsSection: React.FC = () => (
  <section id="Achievements" style={{ backgroundColor: '#050505', padding: '8rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <FadeUp>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '5rem' }}>
          <span style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>05 / Recognition</span>
          <h2 style={{ fontFamily: '"Georgia", serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
            Achievements
          </h2>
        </div>
      </FadeUp>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
            style={{ backgroundColor: '#050505', padding: '2.5rem', borderTop: '2px solid rgba(255,255,255,0.15)' }}
          >
            <div style={{ fontFamily: '"Georgia", serif', fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.08)', lineHeight: 1, marginBottom: '1.5rem' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>
              {a.year}
            </div>
            <h3 style={{ fontFamily: '"Georgia", serif', fontSize: '1.4rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', marginBottom: '1rem', lineHeight: 1.2 }}>
              {a.title}
            </h3>
            <p style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontWeight: 300 }}>
              {a.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── CONTACT ──────────────────────────────────────────────────────────────────
const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  return (
    <section id="Contact" style={{ backgroundColor: '#000', padding: '8rem 2rem 6rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>06 / Contact</span>
          </div>
          <h2 style={{ fontFamily: '"Georgia", serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: '1.5rem' }}>
            Let's Build<br />
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>Together</span>
          </h2>
          <p style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: '4rem', maxWidth: '480px', fontWeight: 300 }}>
            Open to new projects, collaborations, and opportunities. Reach out and let's have a conversation.
          </p>
        </FadeUp>

        <FadeUp delay={100}>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
            <a href="mailto:zhaztedv@gmail.com" style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = '#fff'; (e.target as HTMLElement).style.borderColor = '#fff'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}>
              zhaztedv@gmail.com ↗
            </a>
            <a href="https://github.com/Miraku17" target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = '#fff'; (e.target as HTMLElement).style.borderColor = '#fff'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}>
              github.com/Miraku17 ↗
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={200}>
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.15)', textAlign: 'center' }}
              >
                <div style={{ fontFamily: '"Georgia", serif', fontSize: '2rem', color: '#fff', marginBottom: '0.75rem' }}>Message Received</div>
                <p style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>I'll be in touch shortly.</p>
                <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }} style={{ marginTop: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'underline', fontFamily: '"Helvetica Neue", sans-serif' }}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  {(['name', 'email'] as const).map(field => (
                    <div key={field}>
                      <label style={{ display: 'block', fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.6rem' }}>
                        {field === 'name' ? 'Your Name' : 'Email'}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        value={form[field]}
                        onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                        required
                        style={{
                          width: '100%', backgroundColor: 'transparent',
                          border: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)',
                          color: '#fff', padding: '0.75rem 0',
                          fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.95rem',
                          outline: 'none', boxSizing: 'border-box',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.6)'}
                        onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.6rem' }}>
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                    rows={5}
                    style={{
                      width: '100%', backgroundColor: 'transparent',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff', padding: '1rem',
                      fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.95rem',
                      outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '0.875rem 2.5rem',
                    backgroundColor: '#fff', color: '#000',
                    border: 'none', cursor: 'pointer',
                    fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.75rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700,
                    opacity: status === 'sending' ? 0.5 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeUp>
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer style={{
    backgroundColor: '#000', borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '2rem', textAlign: 'center',
  }}>
    <div style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)' }}>
      Zian Rinzler Valles · {new Date().getFullYear()} · Built with React
    </div>
  </footer>
);

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles: React.FC = () => (
  <style>{`
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { background: #000; color: #fff; -webkit-font-smoothing: antialiased; }
    ::selection { background: rgba(255,255,255,0.15); }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #000; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); }
    input:-webkit-autofill { -webkit-box-shadow: 0 0 0px 1000px #000 inset !important; -webkit-text-fill-color: #fff !important; }
    .decrypt-revealed { color: #fff; }
    .decrypt-scrambled { color: rgba(255,255,255,0.18); }
    .decrypt-revealed-dim { color: rgba(255,255,255,0.25); }
    .decrypt-scrambled-dim { color: rgba(255,255,255,0.08); }
    @keyframes marquee-forward {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    @keyframes marquee-reverse {
      from { transform: translateX(-50%); }
      to { transform: translateX(0); }
    }
    .marquee-forward { animation: marquee-forward 28s linear infinite; }
    .marquee-reverse { animation: marquee-reverse 28s linear infinite; }
    .marquee-forward:hover, .marquee-reverse:hover { animation-play-state: paused; }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes scrollBar {
      0% { transform: scaleY(0); transform-origin: top; }
      50% { transform: scaleY(1); transform-origin: top; }
      51% { transform: scaleY(1); transform-origin: bottom; }
      100% { transform: scaleY(0); transform-origin: bottom; }
    }
  `}</style>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
const ProfessionalPortfolio: React.FC = () => (
  <>
    <GlobalStyles />
    <Nav />
    <main>
      <Hero />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <AchievementsSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default ProfessionalPortfolio;
