<template>
  <div class="p-4 rounded-lg flex flex-col gap-4 border border-primary/20 bg-primary/5">
    <slot />
  </div>
</template>

<style>
@reference "~/assets/css/main.css";

.simple-box {
  @apply size-8 rounded-md bg-primary grid place-items-center font-semibold;
}
</style>
