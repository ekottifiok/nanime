<script setup lang="ts">
import { useTemplateRef } from 'vue'

const target = useTemplateRef('target')

defineExpose({ target })
</script>

<template>
  <div ref="target">
    <span class="item">Hello</span>
    <span class="item">World</span>
  </div>
</template>
