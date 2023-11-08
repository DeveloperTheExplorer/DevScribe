<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import Search from 'virtual:icons/tabler/search'
	
	import techMappingJson from '$lib/static/tech-mapping.json'

	const techMapping: Record<string, string> = techMappingJson;
	const allTechCount = Object.keys(techMapping).length;
	const topTechnologies = ['JavaScript', 'NodeJS', 'ReactJS', 'Preact', 'TypeScript', 'Vue', 'Tailwind', 'Mongodb', 'Prisma', 'PostgreSQL', 'MySQL', 'Firebase', 'AWS', 'sass', 'Svelte', 'SvelteKit', 'NextJS', 'ExpressJS'];
	let searchText = '';
	let visibleTechs = topTechnologies;
	let selectedTechs: string[] = ['NodeJS'];

	const { messages, input, handleSubmit, isLoading } = useChat({
		api: '/api/course'
	});

	const handleTechClick = (tech: string) => {
		if (selectedTechs.includes(tech)) {
			selectedTechs = selectedTechs.filter((t) => t !== tech);
			return;
		}
		selectedTechs = [...selectedTechs, tech];
	}

	const handleSearch = () => {
		console.log('searchText :>> ', searchText);
		if (searchText === '') {
			visibleTechs = topTechnologies;
			return;
		} 
		visibleTechs = Object.keys(techMapping).filter(
			(tech) => tech.toLowerCase().includes(searchText.toLowerCase())
		);
		console.log('visibleTechs :>> ', visibleTechs);
	}

	const handlePrompt = (e: CustomEvent) => {
		handleSubmit(e, { 
			options: {
				body: { selectedTechs }
			}
		})
	}

	$: console.log($messages);
</script>

<main class="flex flex-col items-center py-20">
	<h1>Search Page</h1>

	<Stepper on:complete={handlePrompt}>
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

			<div class="input-group grid-cols-[auto_1fr_auto] w-1/2">
				<div class="input-group-shim"><Search /></div>
				<input 
					class="p-2" 
					type="search" 
					placeholder={`Search ${allTechCount} technologies...`} 
					bind:value={searchText}
					on:input={handleSearch}
				/>
			</div>
			<div class="flex flex-row items-center flex-wrap gap-2">
				{#each selectedTechs as tech}
					<button class="chip variant-soft hover:variant-filled" on:click={() => handleTechClick(tech)}>
						<img
							class="w-4 h-auto"
							src={`/icons/file_type_${techMapping[tech.toLowerCase()]}.svg`}
							alt={techMapping[tech]}
						/>
						<span>{tech}</span>
					</button>
				{/each}
			</div>
			<div class="card grid grid-cols-6 gap-4 p-4">
				{#each visibleTechs as tech}
					<button
						class="flex flex-col items-center justify-center rounded-md p-2 gap-2"
						class:variant-filled-tertiary={selectedTechs.includes(tech)}
						class:shadow-sm={selectedTechs.includes(tech)}
						on:click={() => handleTechClick(tech)}
					>
						<img
							class="w-8 h-auto"
							src={`/icons/file_type_${techMapping[tech.toLowerCase()]}.svg`}
							alt={techMapping[tech]}
						/>
						<p class="w-24 text-ellipsis overflow-hidden">{tech}</p>
					</button>
				{/each}
			</div>
		</Step>
		<Step>
			<svelte:fragment slot="header">Describe Your Project</svelte:fragment>
      <p>Try to describe in detail what your project is about. Make sure to point out key features of your app.</p>

			<div class="flex flex-row items-center flex-wrap gap-2">
				{#each selectedTechs as tech}
					<button class="chip variant-soft hover:variant-filled" on:click={() => handleTechClick(tech)}>
						<img
							class="w-4 h-auto"
							src={`/icons/file_type_${techMapping[tech.toLowerCase()]}.svg`}
							alt={techMapping[tech]}
						/>
						<span>{tech}</span>
					</button>
				{/each}
			</div>
			<div class="flex flex-col justify-center pb-4">
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
