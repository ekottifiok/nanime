<template>
  <div class="p-8 space-y-8">
    <h1 class="text-2xl font-bold mb-4">
      useSplitText Demo
    </h1>

    <PWrapper class="space-y-4">
      <div
        ref="target"
        class="leading-tight"
      >
        Hello there!
      </div>
    </PWrapper>
  </div>
</template>

<script setup lang="ts">
const { $anime } = useNuxtApp()
const { chars } = useSplitText(
  useTemplateRef('target'),
  { words: false, chars: true },
)

useAnimate(chars, {
  y: [
    { to: '-45%', ease: 'outExpo', duration: 600 },
    { to: 0, ease: 'outBounce', duration: 800, delay: 100 },
  ],
  rotate: {
    from: '-1turn',
    delay: 0,
  },
  delay: $anime.utils.stagger(100),
  ease: 'inOutCirc',
  loopDelay: 1000,
  loop: true,
})
</script>
