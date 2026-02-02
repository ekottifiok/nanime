<script setup lang="ts">
import { useAnimate } from '#imports'
import { stagger } from '#nanime/utils'

useAnimate('.boxes > .box', {
  y: {
    to: '-80%',
    ease: 'outBack',
    duration: 600,
  },
  rotate: {
    from: '-1turn',
    delay: 0,
  },
  scale: [1, 1.1, 0.8, 1],
  delay: stagger(50),
  ease: 'inOutCirc',
  loopDelay: 1000,
  loop: true,
  alternate: true,
})
</script>

<template>
  <div class="p-8 flex items-center h-64">
    <div class="boxes grid grid-cols-5 place-items-center gap-2.5">
      <div
        v-for="i in 20"
        :key="i"
        class="box size-8 rounded-md bg-white/40"
      />
    </div>
  </div>
</template>
