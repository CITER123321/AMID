import React from 'react';
import { Train } from '@amid/shared/types';
export const TrainList: React.FC<{ trains: Train[] }> = ({ trains }) => (
  <div style={{ marginTop: '10px', background: '#222', padding: '10px', border: '1px solid #444' }}>
    <h3 style={{ margin: '0 0 10px 0' }}>Active Trains</h3>
    {trains.map(t => (
      <div key={t.id} style={{ fontSize: '0.8em', borderBottom: '1px solid #333', padding: '5px 0' }}>
        <strong>{t.id}</strong> - {Math.round(t.currentSpeed)} km/h | {t.position.segmentId} | {t.status || 'Active'}
      </div>
    ))}
  </div>
);
