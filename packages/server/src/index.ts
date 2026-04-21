import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SimulationEngine } from '@amid/shared/engine.js';
import { RadioSystem } from '@amid/shared/radio.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const simulation = new SimulationEngine();
const radio = new RadioSystem();

setInterval(() => {
  simulation.step(0.1);
  io.emit('state-update', simulation.getState());
}, 100);

io.on('connection', (socket) => {
  socket.on('radio-send', (text) => {
    const msg = radio.sendMessage(socket.id.substring(0, 5), 'ALL', text);
    io.emit('radio-message', msg);
  });

  socket.on('command', (cmd) => {
      simulation.processCommand(cmd);
  });
});

httpServer.listen(3001, () => console.log('Server on 3001'));
