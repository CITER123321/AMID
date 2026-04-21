import React, { useEffect, useRef } from 'react';
import { SimulationState } from '@amid/shared/types';
export const SchematicRenderer: React.FC<{ state: SimulationState }> = ({ state }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 1000, 400);
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(50, 200); ctx.lineTo(950, 200);
    ctx.stroke();
    state.signals.forEach(s => {
      ctx.fillStyle = s.aspect === 'STOP' ? 'red' : 'green';
      ctx.beginPath(); ctx.arc(400, 190, 5, 0, 7); ctx.fill();
    });
    ctx.fillStyle = 'yellow';
    state.trains.forEach(t => ctx.fillRect(50 + t.position.distance / 4, 195, 20, 10));
  }, [state]);
  return <canvas ref={canvasRef} width={1000} height={400} style={{ border: '1px solid #333' }} />;
};
