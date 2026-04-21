import { SignalAspect, Signal } from './types.js';

export function getAspectColors(aspect: SignalAspect): string[] {
  switch (aspect) {
    case SignalAspect.STOP: return ['red'];
    case SignalAspect.PROCEED: return ['green'];
    case SignalAspect.CAUTION: return ['orange'];
    case SignalAspect.PROCEED_40: return ['orange', 'orange'];
    case SignalAspect.MANEUVER: return ['white'];
    default: return ['red'];
  }
}
