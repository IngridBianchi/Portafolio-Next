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
        <input
          type="checkbox"
          className="hidden"
          checked={value}
          onChange={onChange}
          aria-label={`Cambiar a ${value ? rightLabel : leftLabel}`}
        />
        <div
          className="w-10 h-5 rounded-full transition-all duration-300"
          style={{
            background: value
              ? 'linear-gradient(to right, #ff4d9e, #ff1f81)'
              : '#ccc',
          }}
        ></div>
        <div
          className="w-6 h-6 bg-white rounded-full shadow-md absolute top-1/2 -translate-y-1/2 transition-all duration-300"
          style={{ left: value ? 'calc(100% - 24px)' : '0' }}
        ></div>
      </div>
      <div className="ml-2 text-sm text-white">{value ? rightLabel : leftLabel}</div>
    </label>
  );
};

export default Switcher;