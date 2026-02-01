<template>
  <div :class="classes">
    <span v-if="label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

interface Props {
  label?: string
  extraClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  extraClass: '',
})

const classes = computed(() => {
  const defaultClasses = 'size-10 bg-green-500 rounded-md shadow-lg flex items-center justify-center text-white font-bold'
  return twMerge(defaultClasses, props.extraClass)
})
</script>
