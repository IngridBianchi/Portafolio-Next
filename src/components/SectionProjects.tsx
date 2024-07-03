// src/components/SectionProjects.tsx
import React from 'react';
import CardItem from './CardItem';

interface Props {
  projects: any[]; // Array de objetos proyecto
  lang?: any;
}

const SectionProjects: React.FC<Props> = ({ projects , lang
}) => {
  return (
    <section className="px-4 py-8 bg-black text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4">{lang.my_projects}</h2>
        <div className="flex overflow-x-auto">
          {projects.map((project) => (
            <CardItem key={project.id} item={project}  lang={lang}  />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionProjects;
