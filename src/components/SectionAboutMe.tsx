// src/components/SectionAboutMe.tsx
import React from 'react';
import Image from 'next/image';

interface Props {
  aboutText: string;
}

const SectionAboutMe: React.FC<Props> = ({ aboutText }) => {
  return (
    <section className="px-4 py-8 bg-black text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="text-center md:text-left">
            <div className="relative h-80 w-80 mx-auto md:mx-0 mb-6 md:mb-0">
              <Image
                src="/assets/perfil_foto_arrua.jpg"
                alt="Profile Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h6 className="text-lg font-bold mb-2">{aboutText}</h6>
            <p>{aboutText}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAboutMe;

