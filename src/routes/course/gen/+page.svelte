<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { Stepper, Step } from '@skeletonlabs/skeleton';

	const { messages, input, handleSubmit, isLoading } = useChat({
		api: '/api/course'
	});

	$: console.log($messages);
</script>

<main class="flex flex-col items-center py-20">
	<h1>Search Page</h1>

	<Stepper on:complete={handleSubmit}>
		<Step>
			<svelte:fragment slot="header">Create Your Own Personal Course!</svelte:fragment>
			<p class="mb-6">
				With the help of our AI, you can create your own personal course to create any project ideas
				you have!
			</p>
		</Step>
		<Step>
			<svelte:fragment slot="header">Select Your Tech-Stack</svelte:fragment>
      <p class="mb-6">
        If you know what tech-stack you want to use, you can select it here. Otherwise, you can leave it blank.
      </p>
		</Step>
		<Step>
			<svelte:fragment slot="header">Describe Your Project</svelte:fragment>
      <p>Try to describe in detail what your project is about. Make sure to point out key features of your app.</p>

			<div class="flex flex-row justify-center py-4">
				<textarea
          class="textarea w-full p-2"
          rows="4"
					name="prompt"
					placeholder="You are presented with an outfit based on your current closet items and based on the weather where the user resides..."
					bind:value={$input}
				/>
				{#if $isLoading}
					<div>Loading...</div>
				{/if}
      </div>
		</Step>
	</Stepper>

	{#each $messages as message}
		<li>{message.role}: {message.content}</li>
	{/each}
</main>
