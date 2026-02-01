<template>
  <div :class="wrapperClasses">
    <button
      v-for="item in items"
      :key="item.id"
      :class="getButtonClasses(item.id)"
      @click="handleTabClick(item.id)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

interface TabItem {
  id: string
  label: string
}

interface Props {
  items: TabItem[]
  modelValue: string
  extraClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  extraClass: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const wrapperClasses = computed(() => {
  const defaultClasses = 'flex gap-2 p-1 bg-gray-800/50 rounded-lg'
  return twMerge(defaultClasses, props.extraClass)
})

function getButtonClasses(itemId: string) {
  const baseClasses = 'px-3 py-1 rounded text-sm transition-colors'
  const activeClasses = itemId === props.modelValue
    ? 'bg-white text-black'
    : 'text-gray-400 hover:text-white'

  return twMerge(baseClasses, activeClasses)
}

function handleTabClick(id: string) {
  emit('update:modelValue', id)
}
</script>
