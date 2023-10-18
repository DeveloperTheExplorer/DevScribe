<script lang="ts">

  let promptMsg = '';

  const promptAI = async () => {
  };
</script>

<h1 class="text-5xl text-blue-500">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<input
  type="text"
  placeholder="Prompt AI..."
  bind:value={promptMsg}
>
<button on:click={promptAI}>Prompt AI</button>