import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import useDarkMode from '../hooks/useDarkMode';
import Header from '../components/Header';
import SectionAboutMe from '../components/SectionAboutMe';
import SectionStartups from '../components/SectionStartups';
import SectionProjects from '../components/SectionProjects';
import SectionLanguages from '../components/SectionLanguages';
import { useState } from 'react';

interface Props {
  initialLanguage: string;
  texts: any;
  startups: any[];
  projects: any[];
  repositories: any[];
  stackImages: any;
}

const Home: React.FC<Props> = ({ initialLanguage, texts, startups, projects, repositories, stackImages }) => {
  const { theme, themeStyles, toggleTheme } = useDarkMode();
  const [language, setLanguage] = useState<string>(initialLanguage);

  const router = useRouter();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
    router.push('/', '/', { locale: newLanguage });
  };

  return (
    <div style={{ backgroundColor: themeStyles.colors.background, color: themeStyles.colors.text }}>
      <Header
        theme={theme} // Agrega esta línea
        toggleTheme={toggleTheme}
        toggleLanguage={toggleLanguage}
        language={language}
        texts={texts}
      />
      <SectionAboutMe aboutText={texts.who_i_am} />
      <SectionStartups startups={startups} lang={texts} />
      <SectionProjects projects={projects} lang={texts} />
      <SectionLanguages repositories={repositories} stackImages={stackImages} lang={texts} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const texts = require(`../locales/${locale}.json`);
  const startups = require(`../constants/startups_arrua.json`);
  const projects = require(`../constants/proyectos_arrua.json`);
  const repositories = require(`../constants/repositorios_arrua.json`);
  const stackImages = {
    PHP: "./assets/php.png",
    TypeScript: "./assets/ts.webp",
    Python: "./assets/py.jpg",
    JavaScript: "./assets/js.png",
    'C#': "./assets/c_sharp.webp",
    Java: "./assets/java.png"
  };

  return {
    props: {
      initialLanguage: locale,
      texts,
      startups,
      projects,
      repositories,
      stackImages,
    },
  };
};

export default Home;
