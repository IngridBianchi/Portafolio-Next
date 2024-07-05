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
    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <div style={{ position: 'relative' }}>
        <input type="checkbox" className="hidden" checked={value} onChange={onChange} />
        <div style={{ width: '40px', height: '20px', backgroundColor: '#ccc', borderRadius: '10px', display: 'inline-block' }}></div>
        <div style={{ width: '24px', height: '24px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: value ? 'calc(100% - 24px)' : '0' }}></div>
      </div>
      <div style={{ marginLeft: '8px', fontSize: '14px' }}>{value ? rightLabel : leftLabel}</div>
    </label>
  );
};

export default Switcher;
