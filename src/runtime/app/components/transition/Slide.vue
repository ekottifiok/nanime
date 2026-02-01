<script setup lang="ts">
import { computed, TransitionGroup, Transition } from 'vue'
import { normalizeDuration, normalizeOffset, type TransitionOffsetInput } from '../../utils/transition-utils'
import { isStandardEase, isWaapiEase, type SharedTransitionProps } from './types'
import { animate, waapi } from 'animejs'
import { unref, useAnimeLayout, useTemplateRef } from '#imports'

type TransitionSlideProp = SharedTransitionProps & {
  axis?: 'x' | 'y'
  offset?: TransitionOffsetInput
}

const props = withDefaults(
  defineProps<TransitionSlideProp>(),
  {
    ease: 'out',
    noOpacity: false,
    useWaapi: true,
    offset: '20%',
    tag: 'div',
    duration: () => ({
      enter: 300,
      leave: 300,
    }),
  },
)

const delays = computed(() => normalizeDuration(props.delay))
const durations = computed(() => normalizeDuration(props.duration))
const offsets = computed(() => normalizeOffset(props.offset))

const isGrouped = computed(() => props.group ?? false)
const groupWrapper = useTemplateRef<HTMLElement | null>('group-wrapper')
const groupWrapperRef = computed(() => isGrouped.value ? unref(groupWrapper) : null)

const layoutAnimation = useAnimeLayout(
  groupWrapperRef,
  computed(() => {
    const ease = isStandardEase(props) ? props.ease : undefined
    const easeString = typeof ease === 'string' ? ease : undefined
    const layoutOptions = 'layoutOptions' in props && props.layoutOptions
    return {
      ...layoutOptions,
      enterFrom: {
        delay: delays.value.enter,
        duration: durations.value.enter,
        ...(easeString && { ease: easeString }),
      },
      leaveTo: {
        delay: delays.value.leave,
        duration: durations.value.leave,
        ...(easeString && { ease: easeString }),
      },
    }
  }),
)

function onEnter(el: HTMLElement, done: () => void) {
  const sharedEnterOptions = {
    delay: delays.value.enter,
    duration: durations.value.enter,
    ...(props.axis === 'y' && { y: { from: offsets.value.enter } }),
    ...(props.axis === 'x' && { x: { from: offsets.value.enter } }),
    ...(!props.noOpacity && { opacity: [0, 1] }),
  } as const

  if (props.useWaapi && !props.group) {
    const ease = isWaapiEase(props) ? props.ease : undefined
    waapi.animate(el, {
      ...sharedEnterOptions,
      ...(ease && { ease }),
      onComplete: done,
    })
  }
  else if (!props.group) {
    const ease = isStandardEase(props) ? props.ease : undefined
    animate(el, {
      ...sharedEnterOptions,
      ...(ease && { ease }),
      onComplete: done,
    })
  }
  else if (props.group) {
    layoutAnimation.animate(props.animateOptions, done)
    return
  }

  done()
}

function onLeave(el: HTMLElement, done: () => void) {
  const sharedLeaveOptions = {
    delay: delays.value.leave,
    duration: durations.value.leave,
    ...(props.axis === 'y' && { y: { to: offsets.value.leave } }),
    ...(props.axis === 'x' && { x: { to: offsets.value.leave } }),
    ...(!props.noOpacity && { opacity: [1, 0] }),
  } as const

  if (props.useWaapi && !props.group) {
    const ease = isWaapiEase(props) ? props.ease : undefined
    waapi.animate(el, {
      ...sharedLeaveOptions,
      ...(ease && { ease }),
      onComplete: done,
    })
  }
  else if (!props.group) {
    const ease = isStandardEase(props) ? props.ease : undefined
    animate(el, {
      ...sharedLeaveOptions,
      ...(ease && { ease }),
      onComplete: done,
    })
  }
  else if (props.group) {
    layoutAnimation.animate(props.animateOptions, done)
    return
  }

  done()
}
</script>

<template>
  <component
    :is="isGrouped ? TransitionGroup : Transition"
    :ref="isGrouped ? 'group-wrapper' : undefined"
    :css="false"
    :tag="isGrouped ? props.tag : undefined"
    @before-enter="isGrouped && layoutAnimation.record()"
    @enter="onEnter"
    @before-leave="isGrouped && layoutAnimation.record()"
    @leave="onLeave"
  >
    <slot />
  </component>
</template>
