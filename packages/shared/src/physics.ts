import { Train, TrackSegment } from './types.js';

export function updateTrainPhysics(
  train: Train,
  segment: TrackSegment,
  deltaTime: number,
  throttle: number,
): Train {
  const maxAcceleration = 0.5;
  const maxDeceleration = 1.0;
  let acceleration = 0;
  if (throttle > 0) {
    acceleration = throttle * maxAcceleration;
  } else if (throttle < 0) {
    acceleration = throttle * maxDeceleration;
  }
  const drag = 0.01 * train.currentSpeed;
  acceleration -= drag;
  let speedMs = (train.currentSpeed * 1000) / 3600;
  speedMs += acceleration * deltaTime;
  if (speedMs < 0) speedMs = 0;
  const currentMaxSpeedMs = (segment.maxSpeed * 1000) / 3600;
  if (speedMs > currentMaxSpeedMs) speedMs = currentMaxSpeedMs;
  const distanceTravelled = speedMs * deltaTime;
  const newDistance = train.position.distance + (train.direction === 'forward' ? distanceTravelled : -distanceTravelled);
  return {
    ...train,
    currentSpeed: (speedMs * 3600) / 1000,
    position: {
      ...train.position,
      distance: newDistance,
    },
  };
}
