<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  interface $$Props extends HTMLButtonAttributes {
    primary?: boolean
    secondary?: boolean
    tertiary?: boolean
    danger?: boolean
  }

  export let primary: boolean = true;
  export let secondary: boolean = false;
  export let tertiary: boolean = false;
  export let danger: boolean = false;
</script>

<button
  class="px-4 py-2 rounded-md text-white font-medium transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
  class:bg-blue-500={primary} class:hover:bg-blue-600={primary}
  class:bg-blue-200={secondary} class:hover:bg-blue-300={secondary}
  class:bg-purple-500={tertiary} class:hover:bg-purple-600={tertiary}
  class:bg-red-500={danger} class:hover:bg-red-600={danger}
  on:click
  {...$$restProps}
>
  <slot></slot>
</button>