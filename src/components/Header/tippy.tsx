import React, { useEffect } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {

  useEffect(() => {
    // We will handle the tippy initialization in the Header component
  }, [content]);

  return <div className="tooltip" data-content={content}>{children}</div>;
};

export default Tooltip;
