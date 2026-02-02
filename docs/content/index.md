---
seo:
  title: Effortless animations with AnimeJS
  description: Build SSR Safe animations for Nuxt without having to worry about
    targets, hooks and component lifecycle.
---

::u-page-hero
---
orientation: horizontal
---
  ::code-group
    ::hero-animation{label="Preview"}
    ::
    ```html [Template]
    <div class="boxes grid grid-cols-5 place-items-center gap-2.5">
      <div class="box size-8 rounded-md bg-white/40" v-for="i in 20" :key="i" />
    </div>
    ```
    ```ts [Script]
    import { useAnimate } from '#imports';
    import { stagger } from "#nanime/utils";

    useAnimate(".boxes > .box", {
      y: {
        to: '-80%',
        ease: 'outBack',
        duration: 600,
      },
      rotate: {
        from: '-1turn',
        delay: 0
      },
      scale: [1, 1.1, 0.8, 1],
      delay: stagger(50),
      ease: 'inOutCirc',
      loopDelay: 1000,
      loop: true,
      alternate: true,
    });
    ```
  ::

#title
Effortless animations with [AnimeJS]{.text-primary}

#description
Build SSR Safe animations for Nuxt without having to worry about targets, hooks and component lifecycle.

#links
  :::u-button
  ---
  icon: i-lucide-arrow-right
  size: xl
  to: /getting-started/installation
  ---
  Get started
  :::

  :::copy-code-input{source="npx nuxi module add nanime"}
  :::
::

::u-page-section
#title
Shipped with many features

#features
  :::u-page-card
  ---
  icon: i-simple-icons-nuxt
  spotlight: true
  target: _blank
  to: https://nuxt.com
  ---
  #title
  Built with [Nuxt 4]{.text-primary}
  
  #description
  Created with nuxt for nuxt
  :::

  :::u-page-card
  ---
  icon: i-simple-icons-animedotjs
  spotlight: true
  target: _blank
  to: https://animejs.com/
  ---
  #title
  Powered by [AnimeJS]{.text-primary}
  
  #description
  Animation engine by `animejs`
  :::

  :::u-page-card
  ---
  icon: i-simple-icons-nuxt
  spotlight: true
  target: _blank
  to: https://nuxt.com
  ---
  #title
  [SSR]{.text-primary} safe
  
  #description
  Using composables doesn't break ssr nor cause hydration issues
  :::

  :::u-page-card
  ---
  icon: i-simple-icons-nuxt
  spotlight: true
  target: _blank
  to: https://nuxt.com/docs/guide/directory-structure/app-config
  ---
  #title
  Customizable
  
  #description
  Enable or disable composables or components
  :::
::
