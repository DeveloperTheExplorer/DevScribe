<script lang="ts">
	import type { PageData } from './$types';

	import CourseSummary from '$lib/components/CourseSummary.svelte';

	export let data: PageData;

	const { courses } = data;
</script>

<main class="flex flex-col items-center py-20 pt-10">
	<div class="flex w-full max-w-[1200px] flex-col gap-4">
		<h1>My Courses</h1>
		{#each courses as course}
			<a href="/course/{course.slug}" class="card card-hover p-4">
				<CourseSummary {course} />
			</a>
		{/each}
	</div>
</main>
