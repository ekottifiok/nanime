<template>
  <button
    :class="classes"
    :disabled="disabled"
  >
    <slot name="icon" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

interface Props {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  extraClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  extraClass: '',
})

const classes = computed(() => {
  const baseClasses = 'px-3 py-1 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = props.variant === 'primary'
    ? 'bg-gray-700 hover:bg-gray-600 text-white'
    : 'border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white'

  return twMerge(baseClasses, variantClasses, props.extraClass)
})
</script>
