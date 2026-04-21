import React, { useState } from 'react';
import { RadioMessage } from '@amid/shared/radio';
export const RadioPanel: React.FC<{ messages: RadioMessage[], onSendMessage: (t: string) => void }> = ({ messages, onSendMessage }) => {
  const [text, setText] = useState('');
  return (
    <div style={{ padding: '10px', border: '1px solid #555' }}>
      <div style={{ height: '150px', overflowY: 'scroll', background: '#000' }}>
        {messages.map(m => <div key={m.id}>[{new Date(m.timestamp).toLocaleTimeString()}] {m.from}: {m.text}</div>)}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} onKeyPress={e => e.key === 'Enter' && (onSendMessage(text), setText(''))} />
      <button onClick={() => (onSendMessage(text), setText(''))}>Send</button>
    </div>
  );
};
