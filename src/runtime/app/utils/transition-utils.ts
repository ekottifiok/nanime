export interface DurationOutput {
  enter: number
  leave: number
}

export type TransitionDurationInput
  = | number
    | [number, number]
    | { enter: number, leave: number }

type PropertyValue = 'px' | '%'
type OffsetInput = `${number}` | `-${number}` | `${number}${PropertyValue}` | `-${number}${PropertyValue}`

export interface OffsetOutput {
  enter: OffsetInput | number
  leave: OffsetInput | number
}

export type TransitionOffsetInput
  = | OffsetInput
    | number
    | [OffsetInput | number, OffsetInput | number]
    | { enter: OffsetInput | number, leave: OffsetInput | number }

export function normalizeDuration(duration?: TransitionDurationInput): DurationOutput {
  if (duration === undefined) {
    return { enter: 300, leave: 300 }
  }

  if (typeof duration === 'number') {
    return { enter: duration, leave: duration }
  }

  if (Array.isArray(duration)) {
    return { enter: duration[0], leave: duration[1] }
  }

  return duration
}

function validateOffsetValue(value: OffsetInput | number): void {
  if (typeof value !== 'string') return

  // Allow 'px' or '%' units
  if (value.endsWith('px') || value.endsWith('%')) return

  // Allow plain number strings
  if (/^-?\d+$/.test(value)) return

  throw new Error(`Invalid offset value: "${value}". Offset strings must end with "px" or "%", or be a plain number.`)
}

export function normalizeOffset(offset?: TransitionOffsetInput): OffsetOutput {
  if (offset === undefined) {
    return { enter: 0, leave: 0 }
  }

  if (typeof offset === 'number' || typeof offset === 'string') {
    validateOffsetValue(offset)
    return { enter: offset, leave: offset }
  }

  if (Array.isArray(offset)) {
    validateOffsetValue(offset[0])
    validateOffsetValue(offset[1])
    return { enter: offset[0], leave: offset[1] }
  }

  validateOffsetValue(offset.enter)
  validateOffsetValue(offset.leave)
  return offset
}
