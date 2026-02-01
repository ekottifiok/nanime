<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

interface Props {
  extraClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  extraClass: '',
})

const classes = computed(() => {
  const defaultClasses = 'p-4 border border-dashed border-gray-700 rounded-lg'
  return twMerge(defaultClasses, props.extraClass)
})
</script>
