import React from 'react';
import { PROJECTS } from '../data/portfolio';
import { FeaturedShowcase } from './FeaturedShowcase';
import { ProjectCard } from './ProjectCard';
import { SectionHeader } from './SectionHeader';

const FEATURED = PROJECTS.filter((p) => p.tier === 'Featured');

export const ProjectsSection: React.FC = () => (
  <section
    id="Projects"
    className="border-t border-white/[0.06] bg-black px-5 py-20 md:px-8 md:py-32"
  >
    <div className="mx-auto max-w-[1200px]">
      <SectionHeader eyebrow="03 / Work" title="Selected Projects" />

      <FeaturedShowcase projects={FEATURED} />

      <SectionHeader eyebrow="Full Catalog" title="All Projects" className="mb-10 md:mb-16" />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-px border border-white/[0.06] bg-white/[0.06]">
        {PROJECTS.map((project, i) => (
          <div key={project.id} className="bg-black">
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </div>
  </section>
);
