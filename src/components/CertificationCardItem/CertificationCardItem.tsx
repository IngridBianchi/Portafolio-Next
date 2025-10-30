import React from 'react';
import { useTheme } from '@mui/material/styles';
import styles from '../Module-CSS/index.module.css';

interface Props {
  item: any;
  lang?: any;
}

const CertificationCardItem: React.FC<Props> = ({ item, lang }) => {
  const theme = useTheme();

  return (
    <div className={`${styles.cardContainer} text-${theme.palette.text.primary}`}>
      <div className="px-4 py-4">
        <h3 className="font-bold text-xl text-center mb-4 mt-2">{item.name}</h3>
        
        <div className="mt-2 bg-opacity-50 bg-[#1e1e1e] rounded-lg p-4">
          <p className="font-semibold text-lg mb-2">{item.issuer}</p>
          <p className="text-sm text-gray-400 mb-2">{item.date}</p>

          {item.logo_url && (
            <div className="my-4 flex justify-center items-center h-68"> {/* Altura aumentada a h-48 */}
              <img
                src={item.logo_url}
                alt={`${item.name} Logo`}
                className="h-full w-auto object-contain mx-2"
              />
            </div>
          )}
          
          {item.url && (
            <div className="text-center mt-4">
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-400 transition-colors"
              >
                {lang.view_certificate_button}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationCardItem;
