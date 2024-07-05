import React, { useEffect } from 'react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // Importa los estilos de tippy.js

const Tooltip = ({ content, children }) => {
  useEffect(() => {
    tippy('.tooltip', {
      content: content,
      placement: 'bottom', // Ubicación del tooltip
    });
  }, [content]);

  return <div className="tooltip" id={content} >{children}</div>;
};

export default Tooltip;
