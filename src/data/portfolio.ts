export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  tier: string;
  link?: string;
  repo?: string;
  /** Optional static screenshot. If omitted but `link` is set, a live screenshot is fetched. */
  image?: string;
  /** Optional gallery of screenshots. When present, the card preview is clickable and opens a lightbox. */
  images?: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  tools: string[];
  active: boolean;
}

export interface Achievement {
  title: string;
  year: string;
  description: string;
}

export const NAV_ITEMS = [
  'About',
  'Experience',
  'Projects',
  'Skills',
  'Achievements',
  'Contact',
] as const;

export const SKILLS: Skill[] = [
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

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Buudl',
    description:
      'As Software Engineer Leader, architected a second-hand fashion marketplace built for buying and selling pre-loved clothing. Cross-platform, real-time, production-scale.',
    tech: ['Next.js', 'Laravel', 'React Native', 'Tailwind'],
    tier: 'Featured',
  },
  {
    id: '2',
    title: 'ERP Cerventech',
    description:
      'Enterprise ERP system with Row Level Security, real-time inventory management, and secure multi-role access control for complex business workflows.',
    tech: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind'],
    tier: 'Featured',
    link: 'https://erp.cerventech.com/',
    repo: 'https://github.com/Miraku17/CervenOTManagement',
  },
  {
    id: '3',
    title: 'PSI DEU TZ Service Pro',
    description:
      'Power systems operations platform with form management, detailed report generation, and admin dashboard with Role-Based Access Control.',
    tech: ['Next.js', 'Supabase', 'Vercel'],
    tier: 'Client',
    link: 'https://psideutzservicepro.com/',
    repo: 'https://github.com/Miraku17/PowerSystems',
  },
  {
    id: '4',
    title: 'UNO-R Permit System',
    description:
      'Automated exam permit system for UNO-R. Real-time payment status tracking, digital permit generation, and streamlined administrative workflows.',
    tech: ['Next.js', 'MongoDB', 'Node.js', 'Tailwind'],
    tier: 'Client',
    link: 'https://payco-uno-r.vercel.app/',
  },
  {
    id: '5',
    title: 'Courtify',
    description:
      'Venue booking system for tennis and pickleball courts. Intuitive scheduling interface streamlining court reservations.',
    tech: ['Next.js', 'Supabase', 'Vercel'],
    tier: 'Personal',
    link: 'https://courtify.online/',
    repo: 'https://github.com/Miraku17/Courtly',
  },
  {
    id: '6',
    title: 'Doodle Museum',
    description:
      'Interactive canvas where users create doodles and vote on favorites. Persistent profile system and real-time community gallery.',
    tech: ['Next.js', 'Supabase', 'Canvas API'],
    tier: 'Personal',
    link: 'https://doodle-museum.vercel.app/',
    repo: 'https://github.com/Miraku17/Doodle-Museum',
  },
  {
    id: '7',
    title: 'SerbisYOU',
    description:
      'Home service booking platform revolutionizing local service connections via mobile. Real-time geolocation and service matching.',
    tech: ['React Native', 'Firebase', 'Google Maps API'],
    tier: 'Personal',
  },
  {
    id: '8',
    title: 'IDAS',
    description:
      'Attendance tracking system built with React Native. High-performance local storage with SQLite and streamlined state management via Zustand.',
    tech: ['React Native', 'Expo', 'SQLite', 'Zustand'],
    tier: 'Personal',
    repo: 'https://github.com/Miraku17/IDAS',
  },
  {
    id: '9',
    title: 'Velocity Pickleball Cebu',
    description:
      'Website for Velocity Pickleball Cebu showcasing their facility, court bookings, and community events.',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    tier: 'Client',
    link: 'https://velocitypickleballcebu.com/',
    repo: 'https://github.com/Miraku17/velocity-hub',
  },
  {
    id: '10',
    title: 'Bedrock 360 Accounting',
    description:
      'Cloud-based accounting software for streamlined bookkeeping, financial reporting, and business finance management.',
    tech: ['Next.js', 'Supabase', 'Vercel'],
    tier: 'Client',
    link: 'https://www.bedrock360accounting.com/',
    repo: 'https://github.com/Miraku17/bedrock-360',
  },
  {
    id: '11',
    title: 'Hyperliquid Trading Bot',
    description:
      'AI-powered automated trading bot for the Hyperliquid exchange. Executes algorithmic strategies with real-time market data and risk management.',
    tech: ['Python', 'Hyperliquid API', 'AI'],
    tier: 'Personal',
    repo: 'https://github.com/Miraku17/hyperliquid-trading-bot',
  },
  {
    id: '12',
    title: 'ETH Dashboard',
    description:
      'Ethereum analytics dashboard for tracking wallet activity, token balances, and on-chain data with real-time market insights.',
    tech: ['Next.js', 'Ethers.js', 'Tailwind'],
    tier: 'Personal',
    repo: 'https://github.com/Miraku17/eth-dashboard',
  },
  {
    id: '13',
    title: 'ClipNET',
    description:
      'Clip management platform and source of truth for clip approvals, upload readiness, and queue state. Features an ML scoring service that ranks clips and a shared Discord bot (ClipBOT) that posts approved clips on a schedule.',
    tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'Gemini'],
    tier: 'Personal',
    link: 'https://clipnet.ai/',
  },
  {
    id: '14',
    title: 'GestureBee',
    description:
      'Real-time sign language recognition system using computer vision and deep learning. Trained with TensorFlow and Keras to reach 98.6% accuracy in gesture classification, with a Flask + Socket.IO backend streaming live hand tracking to a React frontend for accessible sign language communication.',
    tech: ['React', 'TensorFlow', 'Keras', 'Flask', 'Socket.IO', 'Python'],
    tier: 'Personal',
    repo: 'https://github.com/Rhixin/GesturbeeCamera',
    image: '/images/gesturebee/1.webp',
    images: [
      '/images/gesturebee/1.webp',
      '/images/gesturebee/2.webp',
      '/images/gesturebee/3.webp',
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    role: 'SOC Analyst',
    company: 'EY GDS Philippines',
    period: '2025 — Present',
    description:
      'Monitoring and analyzing security events across client environments, triaging alerts, and responding to potential threats to maintain a strong security posture.',
    tools: ['SIEM', 'Threat Detection', 'Incident Response', 'Log Analysis'],
    active: true,
  },
  {
    role: 'IAM Cybersecurity Consultant',
    company: 'EY GDS Philippines',
    period: '2025 — Present',
    description:
      'Specializing in Identity and Access Management cybersecurity solutions, ensuring secure access governance across enterprise environments.',
    tools: ['IAM', 'SailPoint', 'Security Audits', 'Consulting'],
    active: true,
  },
  {
    role: 'Freelance Software Developer',
    company: 'Self-Employed',
    period: '2025 — Present',
    description:
      'Building and delivering full-stack web applications for clients end-to-end — from requirements gathering to production deployment.',
    tools: ['Next.js', 'Supabase', 'Tailwind', 'Vercel'],
    active: true,
  },
  {
    role: 'Junior Full Stack Developer',
    company: 'Wonita (Buudl)',
    period: 'Jul 2024 — Dec 2024',
    description:
      'Developed core marketplace features, implemented real-time search, and built cross-platform mobile applications for a fashion resale startup.',
    tools: ['Next.js', 'React Native', 'Laravel'],
    active: false,
  },
  {
    role: 'Software Developer Intern',
    company: 'Advanced World Solutions',
    period: 'Mar 2024 — Jun 2024',
    description:
      'Created Python GUI applications and automation scripts using Robot Framework and Selenium for enterprise workflow automation.',
    tools: ['Python', 'Robot Framework', 'Selenium'],
    active: false,
  },
  {
    role: 'Full Stack Developer',
    company: 'Freelance',
    period: '2020 — 2024',
    description:
      'Delivered art commission platforms, exam permit systems, and various client projects across 4 years of independent consulting.',
    tools: ['Vue.js', 'Next.js', 'MongoDB'],
    active: false,
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Cum Laude',
    year: '2024',
    description:
      'Graduated with high honors in BS Computer Engineering, demonstrating sustained academic excellence.',
  },
  {
    title: 'Big 4 Placement',
    year: '2025',
    description:
      "Secured dual roles at EY GDS Philippines — one of the world's Big 4 professional services firms.",
  },
  {
    title: 'Dual-Track Career',
    year: '2025',
    description:
      'Operating simultaneously as a full-stack developer and cybersecurity professional — a rare technical breadth.',
  },
];
