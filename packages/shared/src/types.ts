export type Vector2 = { x: number; y: number };

export enum SignalAspect {
  STOP = 'STOP',
  PROCEED = 'PROCEED',
  PROCEED_40 = 'PROCEED_40',
  PROCEED_60 = 'PROCEED_60',
  PROCEED_100 = 'PROCEED_100',
  CAUTION = 'CAUTION',
  EXPECT_40 = 'EXPECT_40',
  EXPECT_60 = 'EXPECT_60',
  EXPECT_100 = 'EXPECT_100',
  MANEUVER = 'MANEUVER',
}

export interface TrackNode {
  id: string;
  position: Vector2;
  connections: string[];
}

export interface TrackSegment {
  id: string;
  startNodeId: string;
  endNodeId: string;
  length: number;
  maxSpeed: number;
  isSwitch: boolean;
  switchState?: 'straight' | 'diverging';
}

export interface Signal {
  id: string;
  nodeId: string;
  directionNodeId: string;
  aspect: SignalAspect;
  type: 'main' | 'maneuver' | 'repeater' | 'distant';
}

export interface Train {
  id: string;
  length: number;
  mass: number;
  maxSpeed: number;
  currentSpeed: number;
  position: {
    segmentId: string;
    distance: number;
  };
  direction: 'forward' | 'backward';
}

export interface SimulationState {
  timestamp: number;
  trains: Train[];
  signals: Signal[];
  segments: TrackSegment[];
}
