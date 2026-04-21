import { SignalAspect, Signal } from './types.js';

export interface InterlockingSystem {
  setSignal(signalId: string, aspect: SignalAspect): void;
  throwSwitch(switchId: string, state: 'straight' | 'diverging'): void;
}

export class BasicInterlocking implements InterlockingSystem {
  constructor(private signals: Signal[]) {}

  public setSignal(signalId: string, aspect: SignalAspect): void {
    const signal = this.signals.find(s => s.id === signalId);
    if (signal) {
      signal.aspect = aspect;
      console.log(`Interlocking: Signal ${signalId} set to ${aspect}`);
    }
  }

  public throwSwitch(switchId: string, state: 'straight' | 'diverging'): void {
    console.log(`Interlocking: Switch ${switchId} thrown to ${state}`);
    // Update logic would go here
  }
}
