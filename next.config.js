module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Modifica la configuración de Webpack aquí si es necesario
    return config;
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en', // Establece 'en' como el valor por defecto
  },
};
