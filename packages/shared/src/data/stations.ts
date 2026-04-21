import { TrackNode, TrackSegment, Signal, SignalAspect } from '../types.js';

export interface StationData {
  name: string;
  nodes: TrackNode[];
  segments: TrackSegment[];
  signals: Signal[];
}

export const GRODZISK_MAZOWIECKI: StationData = {
  name: 'Grodzisk Mazowiecki',
  nodes: [
    { id: 'gm-n1', position: { x: 100, y: 300 }, connections: ['gm-s1'] },
    { id: 'gm-n2', position: { x: 500, y: 300 }, connections: ['gm-s1', 'gm-s2'] },
    { id: 'gm-n3', position: { x: 900, y: 300 }, connections: ['gm-s2'] },
  ],
  segments: [
    { id: 'gm-s1', startNodeId: 'gm-n1', endNodeId: 'gm-n2', length: 1000, maxSpeed: 160, isSwitch: false },
    { id: 'gm-s2', startNodeId: 'gm-n2', endNodeId: 'gm-n3', length: 1000, maxSpeed: 160, isSwitch: false },
  ],
  signals: [
    { id: 'gm-A', nodeId: 'gm-n1', directionNodeId: 'gm-n2', aspect: SignalAspect.STOP, type: 'main' },
  ],
};

export const KORYTOW: StationData = {
  name: 'Korytów',
  nodes: [
    { id: 'ko-n1', position: { x: 100, y: 400 }, connections: ['ko-s1'] },
    { id: 'ko-n2', position: { x: 500, y: 400 }, connections: ['ko-s1', 'ko-s2'] },
    { id: 'ko-n3', position: { x: 900, y: 400 }, connections: ['ko-s2'] },
  ],
  segments: [
    { id: 'ko-s1', startNodeId: 'ko-n1', endNodeId: 'ko-n2', length: 1500, maxSpeed: 200, isSwitch: false },
    { id: 'ko-s2', startNodeId: 'ko-n2', endNodeId: 'ko-n3', length: 1500, maxSpeed: 200, isSwitch: false },
  ],
  signals: [
    { id: 'ko-A', nodeId: 'ko-n1', directionNodeId: 'ko-n2', aspect: SignalAspect.STOP, type: 'main' },
  ],
};
