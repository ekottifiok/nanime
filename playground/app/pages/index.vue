<template>
  <div class="p-8 space-y-8">
    <nav class="space-y-4">
      <h1 class="text-3xl font-bold text-white">
        Nuxt Anime.js Playground
      </h1>

      <div class="flex flex-wrap gap-3">
        <NuxtLink
          to="/composables/use-animate"
          class="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-lg transition-colors border border-gray-700"
        >
          useAnimate Demo
        </NuxtLink>

        <NuxtLink
          to="/transitions/slide-transition"
          class="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-lg transition-colors border border-gray-700"
        >
          Slide Transition
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
</script>
