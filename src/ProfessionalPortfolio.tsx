import React from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const ProfessionalPortfolio: React.FC = () => (
  <>
    <Nav />
    <main>
      <Hero />
      <MarqueeBanner upright="BUILD" italic="SECURE" />
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
