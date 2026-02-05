import { toReactive, tryOnScopeDispose, useMounted } from '@vueuse/core'
import { shallowRef, toValue, watchEffect, type MaybeRefOrGetter } from '#imports'
import { normalizeAnimeTarget } from '../utils/normalize-targets'
import type { Draggable, DraggableParams, TargetsParam } from 'animejs'
import { createDraggable } from 'animejs/draggable'

export function useDraggable(
  target: Parameters<typeof normalizeAnimeTarget>[0],
  options?: MaybeRefOrGetter<DraggableParams>,
): Draggable {
  const mounted = useMounted()
  const dragController = shallowRef(createDraggable({}, {}))

  let oldTarget: TargetsParam
  watchEffect(() => {
    if (!mounted.value) return
    const targets = normalizeAnimeTarget(target)
    if (oldTarget === targets) return
    if (dragController.value) dragController.value.revert()
    oldTarget = targets
    const newAnimation = createDraggable(targets, toValue(options) || {})
    dragController.value = newAnimation
  })

  tryOnScopeDispose(() => {
    dragController.value?.revert()
  })

  return toReactive(dragController)
}
