import React from 'react';
export const SimulationClock: React.FC<{ time: string }> = ({ time }) => (
  <div style={{ fontSize: '2em', fontFamily: 'monospace', color: '#00ff00', background: '#000', padding: '10px', border: '1px solid #333', textAlign: 'center' }}>
    {time}
  </div>
);
