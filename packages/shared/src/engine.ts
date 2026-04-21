import { GRODZISK_MAZOWIECKI } from './data/stations.js';
import { SimulationState } from './types.js';
import { updateSimulation } from './physics.js';
export class SimulationEngine {
  private state: SimulationState;
  constructor() {
    this.state = {
      timestamp: Date.now(), simTime: '12:00:00',
      trains: [{ id: 'EIP-1234', currentSpeed: 0, position: { segmentId: 'gm-s1', distance: 0 }, status: 'Stopped' }],
      signals: GRODZISK_MAZOWIECKI.signals,
      segments: GRODZISK_MAZOWIECKI.segments,
    };
  }
  public step(deltaTime: number) {
    this.state.timestamp = Date.now();
    this.state.simTime = new Date(this.state.timestamp).toTimeString().split(' ')[0];
    this.state.trains = updateSimulation(this.state.trains, this.state.segments, this.state.signals, deltaTime);
  }
  public handleCommand(cmd: any) {
    if (cmd.type === 'SET_SIGNAL') {
      const sig = this.state.signals.find(s => s.id === cmd.id);
      if (sig) sig.aspect = cmd.aspect;
    }
  }
  public getState(): SimulationState { return this.state; }
}
