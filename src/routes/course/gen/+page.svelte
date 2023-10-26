<script lang="ts">
  import { useChat } from 'ai/svelte';
	import Button from "$lib/components/Button.svelte";

  const { messages, input, handleSubmit, isLoading } = useChat({
    api: '/api/course'
  });

  $: console.log($messages);
</script>

<main class="flex flex-col items-center py-20">
  <h1>Search Page</h1>

  <form 
    on:submit={handleSubmit}
    class="flex flex-row justify-center p-10" 
  >
    <input 
      name="prompt" 
      type="text" 
      placeholder="Search..." 
      class="shadow-md w-72 px-2"
      bind:value={$input}
    >
    <Button primary type="submit">Search</Button>
    {#if $isLoading}
      <div>Loading...</div>
    {/if}
  </form>
  
  {#each $messages as message}
    <li>{message.role}: {message.content}</li>
  {/each}
</main>