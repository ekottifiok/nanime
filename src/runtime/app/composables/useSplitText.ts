import { computed, onBeforeUnmount, ref, toValue, watchEffect, type MaybeRef, type MaybeRefOrGetter } from '#imports'
import { splitText, type TextSplitter } from 'animejs/text'
import { normalizeSplitTextTarget } from '../utils/normalize-targets'
import { extractNonFunctionProperties } from '../utils/extract-props'
import { useMounted } from '@vueuse/core'

export function useSplitText(
  target: MaybeRef<Parameters<typeof normalizeSplitTextTarget>[0]>,
  parameters?: MaybeRefOrGetter<Parameters<typeof splitText>[1]>,
) {
  const mounted = useMounted()
  const splitter = ref<TextSplitter | null>(null)

  watchEffect(() => {
    if (!mounted.value) return
    const element = normalizeSplitTextTarget(toValue(target))
    if (!element) return
    splitter.value = splitText(element, toValue(parameters))
  })

  onBeforeUnmount(() => {
    splitter.value?.revert()
    splitter.value = null
  })

  return {
    properties: computed(() => splitter.value ? extractNonFunctionProperties(splitter.value) : undefined),
    lines: computed(() => splitter.value?.lines || []),
    words: computed(() => splitter.value?.words || []),
    chars: computed(() => splitter.value?.chars || []),
    revert: () => splitter.value?.revert(),
    split: () => splitter.value?.split(),
    refresh: () => splitter.value?.refresh(),
  }
}
