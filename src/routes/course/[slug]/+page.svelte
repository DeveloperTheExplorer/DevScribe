<script lang="ts">
	import type { PageData } from './$types';

	import CourseSummary from '$lib/components/CourseSummary.svelte';
	import Markdown from '$lib/components/Markdown.svelte';
	import CourseSidebar from '$lib/components/CourseSidebar.svelte';

	export let data: PageData;

	const { course } = data;
</script>

<div class="flex flex-row">
	<CourseSidebar {course} />
	<main class="flex flex-col items-center py-20 pt-10">
		<Markdown class="mb-10 p-12" />
		<div class="flex w-full max-w-[1200px] flex-col">
			<CourseSummary class="px-3" {course} />

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
</div>
