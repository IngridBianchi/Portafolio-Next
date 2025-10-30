import React from 'react';
import { useTheme } from '@mui/material/styles';
import styles from '../Module-CSS/index.module.css';

interface Props {
  item: any;
  stackImages?: any;
  lang?: any;
}

const LanguageCardItem: React.FC<Props> = ({ item, stackImages, lang }) => {
  const theme = useTheme();
  const mainLogo = stackImages ? stackImages[item?.language_code] : null;

  return (
    <div className={`${styles.cardContainer} text-${theme.palette.text.primary}`}>
      <div className="px-4 py-4">
        <h3 className="font-bold text-xl text-center mb-4 mt-2">{item?.name}</h3>
        
        <div className="mt-2 bg-opacity-50 bg-[#1e1e1e] rounded-lg p-4">
          {item?.backend && item.backend.length > 0 && (
              <div className="mb-4">
                <p className="font-semibold text-lg mb-2">Backend:</p>
                <ul className="list-disc list-inside text-left">
                    {item.backend.map((tech: string, index: number) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>
              </div>
          )}
          
          {item?.frontend && item.frontend.length > 0 && (
              <div className="mb-4">
                <p className="font-semibold text-lg mb-2">Frontend:</p>
                <ul className="list-disc list-inside text-left">
                    {item.frontend.map((tech: string, index: number) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>
              </div>
          )}

          {(lang.idiom === 'es' ? item?.description_es : item?.description_en) && (
            <div className="mb-4">
              <p className="font-semibold text-lg mb-2">{lang.idiom === 'es' ? 'Descripción' : 'Description'}</p>
              <div className="max-h-[120px] overflow-y-auto pr-2">
                <p className="text-justify">
                  {lang.idiom === 'es' ? item?.description_es : item?.description_en}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {mainLogo && (
        <div className="mt-2 flex justify-center items-center h-24"> {/* Increased height from h-16 to h-24 */}
          <img
            src={mainLogo}
            alt="Main Tech Logo"
            className="h-full w-auto object-contain mx-2"
          />
        </div>
      )}
    </div>
  );
};

export default LanguageCardItem;
