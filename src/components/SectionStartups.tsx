// src/components/SectionStartups.tsx
import React from 'react';
import CardItem from './CardItem';

interface Props {
  startups: any[]; // Array de objetos startup
  lang?: any;
}

const SectionStartups: React.FC<Props> = ({ startups, lang}) => {
  return (
    <section className="px-4 py-8 bg-black text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4">{lang.my_startups}</h2>
        <div className="flex overflow-x-auto">
          {startups.map((startup) => (
          <CardItem key={startup.id} item={startup} lang={lang}  />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionStartups;