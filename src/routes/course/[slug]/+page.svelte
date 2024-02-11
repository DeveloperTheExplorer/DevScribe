<script lang="ts">
	import type { PageData } from './$types';
	import { lessonIndex, updateLessonIndex } from '$lib/stores/lessonQueryParam';

	import CourseSummary from '$lib/components/CourseSummary.svelte';
	import Markdown from '$lib/components/Markdown.svelte';

	export let data: PageData;

	const { course } = data;

	$: activeChapterIndex = $lessonIndex ? $lessonIndex[0] - 1 : null;
	$: activeLessonIndex = $lessonIndex ? $lessonIndex[1] - 1 : null;

	$: pageTitle = course.name;

	$: {
		if (activeChapterIndex !== null && activeChapterIndex >= 0) {
			pageTitle = course.chapters[activeChapterIndex].name;
			if (activeLessonIndex !== null && activeLessonIndex >= 0) {
				pageTitle = course.chapters[activeChapterIndex].lessons[activeLessonIndex].name;
			}
		}
	}
</script>

<svelte:head>
	<title>{course.name} | {pageTitle}</title>
</svelte:head>

<main class="flex w-full grow flex-col items-center p-4 lg:p-10">
	<article class="w-full max-w-[1200px]">
		<!-- <h1>{pageTitle}</h1> -->
		<Markdown class="my-10" />
	</article>
</main>
