import type { AutoLayoutParams, EasingParam, LayoutAnimationParams, WAAPIEasingParam } from 'animejs'
import type { TransitionDurationInput } from '../../utils/transition-utils'
import type { VueInstance } from '@vueuse/core'
import type { BaseTransitionProps } from 'vue'

export type SharedTransitionProps = {
  duration?: TransitionDurationInput
  delay?: TransitionDurationInput
  noOpacity?: boolean
  tag?: keyof HTMLElementTagNameMap | HTMLElement | VueInstance
} & (
  | {
    useWaapi: true
    group?: false
    ease?: WAAPIEasingParam
    mode?: BaseTransitionProps['mode']
  }
  | {
    useWaapi: true
    group: true
    ease?: EasingParam
    layoutOptions?: AutoLayoutParams
    animateOptions?: LayoutAnimationParams
  }
  | {
    useWaapi?: false
    group?: false
    ease?: EasingParam
    mode?: BaseTransitionProps['mode']
  }
  | {
    useWaapi?: false
    group: true
    ease?: EasingParam
    layoutOptions?: AutoLayoutParams
    animateOptions?: LayoutAnimationParams
  }
  )

export const isWaapiEase = (
  properties: SharedTransitionProps,
): properties is SharedTransitionProps & { ease?: WAAPIEasingParam } => {
  return properties.useWaapi === true && !properties.group
}

export const isStandardEase = (
  properties: SharedTransitionProps,
): properties is SharedTransitionProps & { ease?: EasingParam } => {
  return properties.useWaapi === false || properties.group === true
}
