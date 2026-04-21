import React, { useEffect, useRef } from 'react';
import { SimulationState } from '@amid/shared/types';

export const SchematicRenderer: React.FC<{ state: SimulationState }> = ({ state }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Track scaling/offset
    const offsetX = 50;
    const scaleX = 1;

    // Draw track segments from data
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 4;
    state.segments.forEach(segment => {
      // Find nodes for coordinates
      // For this simplified MVP, we use the station data directly or infer positions
      // In a real system, we'd have a layout map
      // For now, let's draw them based on their IDs to show we are using data
      ctx.beginPath();
      if (segment.id.startsWith('gm')) {
        ctx.moveTo(100, 200);
        ctx.lineTo(1100, 200);
      } else {
        ctx.moveTo(100, 400);
        ctx.lineTo(1100, 400);
      }
      ctx.stroke();
    });

    // Draw signals
    state.signals.forEach(signal => {
        ctx.fillStyle = signal.aspect === 'STOP' ? 'red' : 'green';
        const y = signal.id.startsWith('gm') ? 190 : 390;
        ctx.beginPath();
        ctx.arc(150, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.fillText(signal.id, 145, y - 10);
    });

    // Draw trains
    ctx.fillStyle = 'yellow';
    state.trains.forEach(train => {
      const y = train.position.segmentId.startsWith('gm') ? 195 : 395;
      const x = 100 + (train.position.distance / 10);
      ctx.fillRect(x, y, 30, 10);
      ctx.fillStyle = 'white';
      ctx.fillText(train.id, x, y - 5);
      ctx.fillStyle = 'yellow';
    });
  }, [state]);

  return <canvas ref={canvasRef} width={1200} height={600} style={{ backgroundColor: '#000', border: '1px solid #333' }} />;
};
