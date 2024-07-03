// src/components/Switcher.tsx
import React from 'react';

interface Props {
  leftLabel: string;
  rightLabel: string;
  value: boolean;
  onChange: () => void;
}

const Switcher: React.FC<Props> = ({ leftLabel, rightLabel, value, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="hidden" checked={value} onChange={onChange} />
        <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
        <div className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 ${value ? 'translate-x-4' : 'translate-x-0'}`}></div>
      </div>
      <div className="ml-2 text-sm">{value ? rightLabel : leftLabel}</div>
    </label>
  );
};

export default Switcher;
