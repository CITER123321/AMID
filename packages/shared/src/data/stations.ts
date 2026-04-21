import { SignalAspect } from '../types.js';
export const GRODZISK_MAZOWIECKI = {
  segments: [
    { id: 'gm-s1', length: 2000, maxSpeed: 160, startNodeId: 'n1', endNodeId: 'n2' },
    { id: 'gm-s2', length: 2000, maxSpeed: 160, startNodeId: 'n2', endNodeId: 'n3' }
  ],
  signals: [
    { id: 'gm-A', nodeId: 'n2', aspect: SignalAspect.STOP },
    { id: 'gm-B', nodeId: 'n3', aspect: SignalAspect.PROCEED }
  ]
};
