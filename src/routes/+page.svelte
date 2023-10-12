<script lang="ts">

  let promptMsg = '';

  const promptAI = async () => {
  };
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<input
  style="display: block; width: 400px;"
  type="text"
  placeholder="Prompt AI..."
  bind:value={promptMsg}
>
<button on:click={promptAI}>Prompt AI</button>
