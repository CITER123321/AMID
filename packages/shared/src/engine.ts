import { GRODZISK_MAZOWIECKI, KORYTOW } from './data/stations.js';
import { SimulationState, SignalAspect } from './types.js';
import { updateTrainPhysics } from './physics.js';
import { BasicInterlocking } from './interlocking.js';

export class SimulationEngine {
  private state: SimulationState;
  private interlocking: BasicInterlocking;

  constructor() {
    this.state = {
      timestamp: Date.now(),
      trains: [
        {
          id: 'EIP-1234',
          length: 200,
          mass: 400,
          maxSpeed: 250,
          currentSpeed: 0,
          position: { segmentId: 'gm-s1', distance: 0 },
          direction: 'forward',
        },
      ],
      signals: [...GRODZISK_MAZOWIECKI.signals, ...KORYTOW.signals],
      segments: [...GRODZISK_MAZOWIECKI.segments, ...KORYTOW.segments],
    };
    this.interlocking = new BasicInterlocking(this.state.signals);
  }

  public step(deltaTime: number) {
    this.state.timestamp = Date.now();
    this.state.trains = this.state.trains.map(train => {
      const segment = this.state.segments.find(s => s.id === train.position.segmentId);
      if (!segment) return train;

      // Simple ETCS-like logic: Stop if next signal is red
      const currentSignal = this.state.signals.find(s => s.nodeId === segment.startNodeId);
      const throttle = (currentSignal?.aspect === SignalAspect.STOP && train.position.distance > 800) ? -1 : 0.5;

      return updateTrainPhysics(train, segment, deltaTime, throttle);
    });
  }

  public processCommand(cmd: any) {
      if (cmd.type === 'SET_SIGNAL') {
          this.interlocking.setSignal(cmd.signalId, cmd.aspect);
      }
  }

  public getState(): SimulationState { return this.state; }
}
