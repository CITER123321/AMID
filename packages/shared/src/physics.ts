import { Train, TrackSegment, SignalAspect, Signal } from './types.js';
export function updateSimulation(trains: Train[], segments: TrackSegment[], signals: Signal[], deltaTime: number): Train[] {
  return trains.map(train => {
    const segment = segments.find(s => s.id === train.position.segmentId);
    if (!segment) return train;

    // Basic signaling: stop if next signal is red
    const signal = signals.find(s => s.nodeId === segment.endNodeId);
    let acceleration = 0.5;
    if (signal?.aspect === SignalAspect.STOP && train.position.distance > segment.length - 200) {
      acceleration = -1.5; // Braking
    }

    let speedMs = (train.currentSpeed * 1000) / 3600;
    speedMs += acceleration * deltaTime;
    if (speedMs < 0) speedMs = 0;
    if (speedMs > (segment.maxSpeed * 1000) / 3600) speedMs = (segment.maxSpeed * 1000) / 3600;

    const distance = train.position.distance + speedMs * deltaTime;
    return { ...train, currentSpeed: (speedMs * 3600) / 1000, position: { ...train.position, distance }, status: speedMs > 0.1 ? 'Moving' : 'Stopped' };
  });
}
