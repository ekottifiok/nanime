import { defineNuxtModule, addPlugin, createResolver, addImportsDir, addComponentsDir, addVitePlugin } from '@nuxt/kit'

export interface ModuleOptions {
  /** Add composables for animejs */
  composables: boolean
  /** Add custom transition components */
  components: boolean
}

const __configKey = 'nanime'
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nanime',
    configKey: __configKey,
    compatibility: {
      nuxt: '>=3.13.5 <5.0.0',
    },
  },
  defaults: {
    composables: true,
    components: true,
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addVitePlugin(() => ({
      name: '__optimize-deps',
      config(config) {
        // This runs before environment setup
        config.optimizeDeps ||= {}
        config.optimizeDeps.include ||= []
        config.optimizeDeps.include.push(
          'animejs', 'animejs/animatable',
          '@vueuse/core', 'animejs/animation',
          'animejs/utils',
        )
      },
    }))

    if (_options.components) {
      addComponentsDir({
        path: resolver.resolve('./runtime/app/components'),
        global: true,
        prefix: 'A',
      })
    }

    if (_options.composables) {
      addImportsDir(resolver.resolve('./runtime/app/composables'))
    }

    _nuxt.options.alias[`#${__configKey}`] = resolver.resolve('./runtime/app/composables')

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
