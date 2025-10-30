import React from 'react';
import CertificationCardItem from '../CertificationCardItem/CertificationCardItem';
import styles from '../Module-CSS/index.module.css';

interface Props {
  certifications: any[];
  lang?: any;
}

const SectionCertifications: React.FC<Props> = ({ certifications, lang }) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>{lang.certifications_title}</h2>
        <div className={styles.cardGrid}>
          {certifications.map((cert) => (
            <CertificationCardItem key={cert.id} item={cert} lang={lang} /> // Pasa la prop lang
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionCertifications;
