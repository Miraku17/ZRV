import type React from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiVuedotjs,
  SiNodedotjs,
  SiPython,
  SiNestjs,
  SiLaravel,
  SiPhp,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiFirebase,
  SiVercel,
  SiExpo,
  SiSqlite,
  SiGithub,
  SiGit,
} from 'react-icons/si';

export interface TechItem {
  name: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
}

export const TECH_ROW1: TechItem[] = [
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

export const TECH_ROW2: TechItem[] = [
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
