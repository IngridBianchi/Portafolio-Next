import React, { useState } from 'react';

interface Props {
  item: any; // Objeto de startup, proyecto o repositorio
  stackImages?: any; // Opcional, imágenes específicas de stack de lenguajes
  lang?: any;
}

const CardItem: React.FC<Props> = ({ item, stackImages, lang }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-2 w-80">
      <div
        className="w-full h-48 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!isHovered ? (
          <img
            src={item?.poster_url}
            alt={item?.name}
            onClick={() => {
              if (!!item?.github) window.open(item?.github);
            }}
            className="w-full h-full object-cover rounded-lg cursor-pointer"
          />
        ) : (
          (lang.idiom === 'es' ? item?.video_tutorial_es : item?.video_tutorial_en) ? (
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${lang.idiom === 'es' ? item?.video_tutorial_es : item?.video_tutorial_en}?autoplay=1&controls=1&modestbranding=1&showinfo=0`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) :
          (
            <img
              src={item?.poster_url}
              alt={item?.name}
              onClick={() => {
                if (!!item?.github) window.open(item?.github);
              }}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
            />
          )
        )}
      </div>

      <div className="flex justify-center">
        {item?.domain && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => window.open(item?.domain)}
          >
            {lang.page_text}
          </button>
        )}
        {item?.github_f && (
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => window.open(item?.github_f)}
          >
            {lang.gh_front_text}
          </button>
        )}
        {item?.github_b && (
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => window.open(item?.github_b)}
          >
            {lang.gh_back_text}
          </button>
        )}
      </div>

      {!!item?.name && (
        <>
          <h3 className="font-bold text-lg">{item?.name}</h3>
          <div className="mt-2">
            <p className="font-semibold">Backend:</p>
            <div className="flex flex-wrap">
              {item?.backend?.map((tech: string, index: number) => (
                <img key={index} src={tech} alt="Backend Tech" className="h-12 w-12 object-contain m-1" />
              ))}
            </div>
          </div>
          <div className="mt-2">
            <p className="font-semibold">Frontend:</p>
            <div className="flex flex-wrap">
              {item?.frontend?.map((tech: string, index: number) => (
                <img key={index} src={tech} alt="Frontend Tech" className="h-12 w-12 object-contain m-1" />
              ))}
            </div>
          </div>
          { lang.idiom === 'es' ? item?.description_es : item?.description_en && (
            <div className="mt-2">
              <p className="font-semibold">{lang.description}</p>
              <div className="flex flex-wrap">
                <p>{lang.idiom === 'es' ? item?.descriptio_es : item?.descriptio_en}</p>
              </div>
            </div>
          )}
        </>
      )}

      {item?.language_code && (
        <div className="mt-2">
          <p className="font-semibold">{lang.lang}</p>
          <div className="flex flex-wrap">
            <img
              key={item.id}
              src={stackImages[item?.language_code]}
              alt="Language"
              className="h-12 w-12 object-contain m-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardItem;
