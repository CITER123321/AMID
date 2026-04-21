import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SimulationEngine } from '@amid/shared/engine.js';
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const simulation = new SimulationEngine();
setInterval(() => {
  simulation.step(0.1);
  io.emit('state-update', simulation.getState());
}, 100);
io.on('connection', (s) => {
  s.on('command', (c) => simulation.handleCommand(c));
});
httpServer.listen(3001, () => console.log('Server running on port 3001'));
