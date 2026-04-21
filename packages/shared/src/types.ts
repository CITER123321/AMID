export type Vector2 = { x: number; y: number };
export enum SignalAspect { STOP = 'STOP', PROCEED = 'PROCEED', PROCEED_40 = 'PROCEED_40', MANEUVER = 'MANEUVER' }
export interface TrackSegment { id: string; length: number; maxSpeed: number; startNodeId: string; endNodeId: string; }
export interface Signal { id: string; nodeId: string; aspect: SignalAspect; }
export interface Train { id: string; currentSpeed: number; position: { segmentId: string; distance: number; }; status: string; }
export interface SimulationState { timestamp: number; simTime: string; trains: Train[]; signals: Signal[]; segments: TrackSegment[]; }
