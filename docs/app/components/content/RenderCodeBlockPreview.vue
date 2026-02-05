<script setup lang="ts">
const props = defineProps<{
  src: string
}>()

const { data: markdown } = await useAsyncData(`preview-${props.src}`, () => useCodeBlockPreview(props.src))
</script>

<template>
  <MDC
    v-if="markdown"
    :value="markdown"
  />
</template>
