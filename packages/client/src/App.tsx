import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { SchematicRenderer } from './components/SchematicRenderer';
import { RadioPanel } from './components/RadioPanel';
import { CameraView3D } from './components/CameraView3D';
import { SimulationState, SignalAspect } from '@amid/shared/types';
import { RadioMessage } from '@amid/shared/radio';
import { translations, Language } from '@amid/shared/i18n';

function App() {
  const [lang, setLang] = useState<Language>('pl');
  const [state, setState] = useState<SimulationState | null>(null);
  const [messages, setMessages] = useState<RadioMessage[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const t = translations[lang];

  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);
    s.on('state-update', setState);
    s.on('radio-message', m => setMessages(prev => [...prev, m].slice(-20)));
    return () => { s.close(); };
  }, []);

  const handleSetSignal = () => {
      socket?.emit('command', { type: 'SET_SIGNAL', signalId: 'gm-A', aspect: SignalAspect.PROCEED });
  };

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>{t.title}</h1>
        <div><button onClick={() => setLang('pl')}>PL</button><button onClick={() => setLang('en')}>EN</button></div>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 3 }}>
          {state ? <SchematicRenderer state={state} /> : <p>{t.connecting}</p>}
          <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
             {state && <CameraView3D state={state} />}
             <div style={{ width: '400px', height: '300px', background: '#222', border: '2px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Satellite View</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <RadioPanel messages={messages} onSendMessage={text => socket?.emit('radio-send', text)} />
          <h2>{t.interlocking}</h2>
          <button style={{ background: '#d32f2f', color: 'white', width: '100%', padding: '10px' }}>{t.stopAll}</button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginTop: '10px' }}>
            <button onClick={handleSetSignal} style={{ padding: '10px' }}>{t.setRoute} (gm-A)</button>
            <button style={{ padding: '10px' }}>{t.cancelRoute}</button>
            <button style={{ padding: '10px' }}>{t.throwSwitch}</button>
            <button style={{ padding: '10px' }}>{t.manualSignal}</button>
          </div>
          <div style={{ marginTop: '20px', padding: '10px', background: '#333', border: '1px solid #555' }}>
            <h3>XP: 1250</h3><p>Rank: Junior Dispatcher</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
