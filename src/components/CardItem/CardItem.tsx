import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { useTheme } from '@mui/material/styles';
import styles from '../Module-CSS/index.module.css';

interface Props {
  item: any;
  stackImages?: any;
  lang?: any;
}

const CardItem: React.FC<Props> = ({ item, stackImages, lang }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageClick = (url: string | undefined) => {
    console.log('handleImageClick ', url);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const theme = useTheme();
  const varHeigth = !!item?.image_url || !isLargeScreen ? '6rem' : '35vh';
  const varWidth = !!item?.image_url || !isLargeScreen ? '12rem' : '35vw';
  const varVideoID = lang.idiom === 'es' && item?.video_tutorial_es ? item?.video_tutorial_es?.split('v=')[1]?.split('&')[0]
    : lang.idiom === 'en' && item?.video_tutorial_en ? item?.video_tutorial_en?.split('v=')[1]?.split('&')[0] : null

  return (
    <div className={`${styles.cardContainer} bg-black text-${theme.palette.text.primary}`}>
      <div className="flex justify-center items-center">
        <div
          className="flex justify-center items-center mt-8"
          style={{
            width: varWidth,
            height: varHeigth,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {!!item?.image_url ? (
            <img
              src={item?.image_url}
              alt={"No Image"}
              onClick={() => { handleImageClick(item?.github) }}
              className="w-11/12 h-full object-cover rounded-md cursor-pointer mx-4"
            />
          ) : !isHovered ? (
            <img
              src={item?.poster_url}
              alt={item?.name}
              className="max-w-full max-h-full object-contain rounded-md cursor-pointer"
            />
          ) : varVideoID !== null ? (
            <YouTube
              videoId={varVideoID}
              opts={{
                height: '100%',
                width: '100%',
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  modestbranding: 1,
                  showinfo: 0
                }
              }}
              className="h-full w-full rounded-md mb-4"
            />
          ) : (
            <img
              src={item?.poster_url}
              alt={item?.name}
              className="max-w-full max-h-full object-contain rounded-md cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="mx-8 mb-8">

        {!!item?.name && (
          <>
            <h3 className="font-bold text-xl text-center mb-4">{item?.name}</h3>
              <div className="flex justify-center items-center mb-4">
                {item?.domain && (
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-md mr-8 hover:bg-blue-700"
                    onClick={() => window.open(item?.domain)}
                  >
                    {lang.page_text}
                  </button>
                )}
                {item?.github_f && (
                  <button
                    className="bg-gray-800 text-white py-2 px-4 rounded-md mr-8 hover:bg-gray-900"
                    onClick={() => window.open(item?.github_f)}
                  >
                    {lang.gh_front_text}
                  </button>
                )}
                {item?.github_b && (
                  <button
                    className="bg-gray-800 text-white py-2 px-4 rounded-md mr-8 hover:bg-gray-900"
                    onClick={() => window.open(item?.github_b)}
                  >
                    {lang.gh_back_text}
                  </button>
                )}
              </div>
            <div className="mt-2 bg-opacity-50 bg-black rounded-lg p-4">
              <div className="mb-4">
                <p className="font-semibold text-lg">Backend:</p>
                <div className="flex flex-wrap">
                  {item?.backend?.map((tech: string, index: number) => (
                    <div key={index} className="mr-2 mb-2">
                      <img src={tech} alt="Backend Tech" className="h-12 w-auto object-contain m-1" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-lg">Frontend:</p>
                <div className="flex flex-wrap">
                  {item?.frontend?.map((tech: string, index: number) => (
                    <div key={index} className="mr-2 mb-2">
                      <img src={tech} alt="Frontend Tech" className="h-12 w-auto object-contain m-1" />
                    </div>
                  ))}
                </div>
              </div>
              {(lang.idiom === 'es' ? item?.description_es : item?.description_en) && (
                <div className="mb-4">
                  <p className="font-semibold text-lg">{lang.description}</p>
                <div style={{ margin: '0 auto', maxHeight: '120px', overflowY: 'auto' }}>

                  <div className="flex flex-wrap mr-2">
                    <p>{lang.idiom === 'es' ? item?.description_es : item?.description_en}</p>
                  </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {item?.language_code && (
        <div className="mt-2 flex justify-center items-center">
          <img
            src={stackImages[item?.language_code]}
            alt="Language"
            className="h-16 w-auto object-contain m-4"
          />
        </div>
      )}
    </div>
  );
};

export default CardItem;
