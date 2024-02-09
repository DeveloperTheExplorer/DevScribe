<script lang="ts">
	import type { PageData } from './$types';

	import CourseSummary from '$lib/components/CourseSummary.svelte';
	import Markdown from '$lib/components/Markdown.svelte';

	export let data: PageData;

	const { course } = data;
</script>

<main class="flex w-full grow flex-col items-center p-4 lg:p-10">
	<article class="w-full max-w-[1200px]">
		<h1>{course.name}</h1>
		<Markdown class="my-10" />
	</article>
</main>
