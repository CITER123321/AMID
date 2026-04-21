import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { SchematicRenderer } from './components/SchematicRenderer';
import { SimulationState, SignalAspect } from '@amid/shared/types';
function App() {
  const [state, setState] = useState<SimulationState | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);
    s.on('state-update', setState);
    return () => { s.close(); };
  }, []);
  const toggleSignal = () => {
    const current = state?.signals.find(s => s.id === 'gm-A')?.aspect;
    socket?.emit('command', { type: 'SET_SIGNAL', id: 'gm-A', aspect: current === 'STOP' ? SignalAspect.PROCEED : SignalAspect.STOP });
  };
  return (
    <div style={{ background: '#1a1a1a', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>ISDR MMO Simulator</h1>
        <h2>{state?.simTime}</h2>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 3 }}>
          {state && <SchematicRenderer state={state} />}
        </div>
        <div style={{ flex: 1, background: '#222', padding: '15px' }}>
          <h3>Control Panel</h3>
          <button onClick={toggleSignal} style={{ width: '100%', padding: '10px', background: '#444', color: '#fff', border: '1px solid #555', cursor: 'pointer' }}>
            Toggle Signal gm-A (Current: {state?.signals.find(s => s.id === 'gm-A')?.aspect})
          </button>
          <div style={{ marginTop: '20px' }}>
            <h4>Trains</h4>
            {state?.trains.map(t => <div key={t.id}>{t.id}: {Math.round(t.currentSpeed)} km/h ({t.status})</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
