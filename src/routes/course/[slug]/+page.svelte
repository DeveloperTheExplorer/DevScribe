<script lang="ts">
	import type { PageData } from './$types';

	import { getTechnologyIconUrl } from '$lib/utils/technologies.util';

	export let data: PageData;

	const { course } = data;
</script>

<main class="flex flex-col items-center py-20 pt-10">
	<div class="flex w-full max-w-[1200px] flex-col">
		<h3 class="">Project: {course.name}</h3>
		<p class="">Description: {course.description}</p>
		<p class="text-surface-300">Slug: {course.slug}</p>
		<div class="mt-4 flex w-full flex-row flex-wrap items-center gap-2">
			{#each course.technologies as tech}
				<div class="variant-filled chip">
					<img class="h-auto w-4" src={getTechnologyIconUrl(tech)} alt={tech} />
					<span>{tech}</span>
				</div>
			{/each}
		</div>

		<div class="mt-4 flex w-full flex-col items-center gap-4">
			{#each course.chapters as chapter}
				<div class="card flex w-2/3 flex-col gap-2 p-4">
					<div class="flex flex-row items-center justify-between">
						<h5>Chapter: {chapter.name}</h5>
						<p>Duration: {chapter.duration} day(s)</p>
					</div>

					<dl class="list-dl">
						{#each chapter.lessons as lesson, index}
							<div>
								<span class="badge bg-primary-500">#{index + 1}</span>
								<span class="flex-auto">
									<dt class="whitespace-normal">{lesson.name}</dt>
								</span>
							</div>
						{/each}
					</dl>
				</div>
			{/each}
		</div>
	</div>
</main>
