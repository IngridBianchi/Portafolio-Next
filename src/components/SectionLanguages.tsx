// src/components/SectionLanguages.tsx
import React from 'react';
import CardItem from './CardItem';

interface Props {
  repositories: any[]; // Array de objetos repositorio
  stackImages: any; // Objeto con las rutas a las imágenes de stack de lenguajes
  lang?: any;
}

const SectionLanguages: React.FC<Props> = ({ repositories, stackImages, lang  }) => {
  return (
    <section className="px-4 py-8 bg-black text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4">{lang.my_lang_stack}</h2>
        <div className="flex overflow-x-auto">
          {repositories.map((repo) => (
            <CardItem key={repo.id} item={repo} stackImages={stackImages} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionLanguages;
