<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import Search from 'virtual:icons/tabler/search';
	import Sparkle from 'virtual:icons/ph/sparkle';
	import TechList from '$lib/components/TechList.svelte';

	import type { ProjectPlanObject } from '$lib/types';
	import untruncateJson from '$lib/utils/json.util';
	import { hashValue } from '$lib/utils/hash.util';
	import {
		allTechCount,
		getTechnologyIconUrl,
		searchTechnologies
	} from '$lib/utils/technologies.util';
	import TechChip from '$lib/components/TechChip.svelte';

	const topTechnologies = [
		'JavaScript',
		'Node.JS',
		'React',
		'Preact',
		'TypeScript',
		'Vue',
		'Tailwind',
		'Mongodb',
		'Prisma',
		'PostgreSQL',
		'MySQL',
		'Firebase',
		'AWS',
		'sass',
		'Svelte',
		'SvelteKit',
		'Next.JS',
		'Express.JS'
	];
	let searchText = '';
	let visibleTechs = topTechnologies;
	let selectedTechs: string[] = [];

	const { messages, input, handleSubmit, isLoading } = useChat({
		api: '/api/course'
	});

	const handleTechClick = (tech: string) => {
		if (selectedTechs.includes(tech)) {
			selectedTechs = selectedTechs.filter((t) => t !== tech);
			return;
		}
		selectedTechs = [...selectedTechs, tech];
	};

	const handleSearch = () => {
		if (searchText === '') {
			visibleTechs = topTechnologies;
			return;
		}
		visibleTechs = searchTechnologies(searchText);
	};

	const handlePrompt = async (e: CustomEvent) => {
		handleSubmit(e, {
			options: {
				body: { selectedTechs }
			}
		});
	};

	const parsePlan = (plan: string): Partial<ProjectPlanObject> => {
		try {
			const parsedPlan: Partial<ProjectPlanObject> = JSON.parse(plan);

			if (parsedPlan.intro?.techStack) {
				parsedPlan.intro.techStack = parsedPlan.intro.techStack.map((tech: string) =>
					tech.replace(/[^a-zA-Z]/g, '')
				);
			}

			return parsedPlan;
		} catch (error) {
			return {};
		}
	};
	$: lastMessage = $messages[$messages?.length - 1];
	$: plan = parsePlan(untruncateJson(lastMessage?.content || ''));
	$: contentHash = lastMessage?.content && !$isLoading && hashValue(lastMessage.content || '');
</script>

<main class="flex flex-col items-center py-20 pt-10">
	<h1 class="mb-8 text-center">Course Generator</h1>

	{#if $messages.length === 0}
		<Stepper on:complete={handlePrompt}>
			<Step>
				<svelte:fragment slot="header">Create Your Own Personal Course!</svelte:fragment>
				<p class="mb-6">
					With the help of our AI, you can create your own personal course to create any project
					ideas you have!
				</p>
			</Step>
			<Step>
				<svelte:fragment slot="header">Select Your Tech-Stack</svelte:fragment>
				<p class="mb-6">
					If you know what tech-stack you want to use, you can select it here. Otherwise, you can
					leave it blank.
				</p>

				<div class="input-group w-1/2 grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim"><Search /></div>
					<input
						class="p-2"
						type="search"
						placeholder={`Search ${allTechCount} technologies...`}
						bind:value={searchText}
						on:input={handleSearch}
					/>
				</div>
				<div class="flex flex-row flex-wrap items-center gap-2">
					{#each selectedTechs as tech}
						<TechChip
							{tech}
							class="variant-soft chip hover:variant-filled"
							on:click={() => handleTechClick(tech)}
						/>
					{/each}
				</div>
				<div class="card grid grid-cols-6 gap-4 p-4">
					{#each visibleTechs as tech}
						<button
							class="flex flex-col items-center justify-center gap-2 rounded-md p-2"
							class:variant-filled-tertiary={selectedTechs.includes(tech)}
							class:shadow-sm={selectedTechs.includes(tech)}
							on:click={() => handleTechClick(tech)}
						>
							<img class="h-auto w-8" src={getTechnologyIconUrl(tech)} alt={tech} />
							<p class="w-24 overflow-hidden text-ellipsis">{tech}</p>
						</button>
					{/each}
				</div>
			</Step>
			<Step>
				<svelte:fragment slot="header">Describe Your Project</svelte:fragment>
				<p>
					Try to describe in detail what your project is about. Make sure to point out key features
					of your app.
				</p>

				<div class="flex flex-row flex-wrap items-center gap-2">
					{#each selectedTechs as tech}
						<TechChip
							{tech}
							class="variant-soft chip hover:variant-filled"
							on:click={() => handleTechClick(tech)}
						/>
					{/each}
				</div>
				<div class="flex flex-col justify-center pb-4">
					<p>
						You are presented with an outfit based on your current closet items and based on the
						weather where the user resides
					</p>
					<textarea
						class="textarea w-full p-2"
						rows="4"
						name="prompt"
						autocomplete="prompt"
						placeholder="You are presented with an outfit based on your current closet items and based on the weather where the user resides..."
						bind:value={$input}
					/>
					{#if $isLoading}
						<div>Loading...</div>
					{/if}
				</div>
			</Step>
		</Stepper>
	{:else}
		<div class="flex w-full max-w-[1200px] flex-col">
			<h3 class="flex w-full grow">Project: {plan?.intro?.name ?? ''}</h3>
			<p class="flex w-full grow">Description: {plan?.intro?.description ?? ''}</p>
			<TechList class="mt-2" techs={plan?.intro?.techStack ?? []} />

			<div class="mt-4 flex w-full flex-col items-center gap-4">
				{#each plan?.plan ?? [] as chapter}
					<div class="card flex w-2/3 flex-col gap-2 p-4">
						<div class="flex flex-row items-center justify-between">
							<h5>Chapter: {chapter?.title ?? ''}</h5>
							<p>Duration: {chapter?.duration ?? ''} day(s)</p>
						</div>

						<dl class="list-dl">
							{#each chapter?.plan ?? [] as chapterPlan, index}
								<div>
									<span class="badge bg-primary-500">#{index + 1}</span>
									<span class="flex-auto">
										<dt class="whitespace-normal">{chapterPlan ?? ''}</dt>
									</span>
								</div>
							{/each}
						</dl>
					</div>
				{/each}
				{#if contentHash}
					<a
						href={`/course/${contentHash}`}
						class="variant-filled btn flex flex-row items-center gap-2"
						data-sveltekit-preload-data="hover"
					>
						<Sparkle /> Start Course!
					</a>
				{/if}
			</div>
		</div>
	{/if}
</main>
