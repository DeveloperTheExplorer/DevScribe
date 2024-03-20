<script lang="ts">
	import { useChat } from 'ai/svelte';
	import type { PageData } from './$types';

	import { lessonIndex } from '$lib/stores/lessonQueryParam';
	import { highlightAllCodeSnippets } from '$lib/utils/markdown.util';

	import Markdown from '$lib/components/Markdown.svelte';

	export let data: PageData;

	const { course } = data;
	let lessonContent: string;

	const { messages, input, handleSubmit, setMessages, isLoading } = useChat({
		api: `/api/course/${course._id}/lesson`,
		initialInput: 'generate lesson',
		onFinish: (message) => {
			if (message?.content && activeLessonIndex !== null && activeChapterIndex !== null) {
				course.chapters[activeChapterIndex].lessons[activeLessonIndex].content = message.content;
				lessonContent = message.content;
			}

			highlightAllCodeSnippets();
		}
	});

	$: activeChapterIndex = $lessonIndex ? $lessonIndex[0] - 1 : null;
	$: activeLessonIndex = $lessonIndex ? $lessonIndex[1] - 1 : null;

	$: pageTitle = course.name;

	$: {
		if (activeChapterIndex !== null && activeChapterIndex >= 0) {
			setMessages([]);
			pageTitle = course.chapters[activeChapterIndex].name;
			if (activeLessonIndex !== null && activeLessonIndex >= 0) {
				pageTitle = course.chapters[activeChapterIndex].lessons[activeLessonIndex].name;
				lessonContent =
					course.chapters[activeChapterIndex].lessons[activeLessonIndex].content || '';
			}
		}
	}

	const handleGenerateLesson = (e: SubmitEvent) => {
		if (activeChapterIndex === null || activeLessonIndex === null) return;

		handleSubmit(e, {
			options: {
				body: {
					chapterIndex: activeChapterIndex,
					lessonIndex: activeLessonIndex
				}
			}
		});
	};
	$: lessonMdn = lessonContent ? lessonContent : $messages[$messages?.length - 1]?.content;
</script>

<svelte:head>
	<title>{course.name} | {pageTitle}</title>
</svelte:head>

<main class="flex w-full grow flex-col items-center p-4 lg:p-10">
	<article class="w-full max-w-[1200px]">
		{#if !lessonMdn}
			<h1>{pageTitle}</h1>
			<form on:submit={handleGenerateLesson}>
				<input bind:value={$input} name="prompt" id="prompt" class="hidden" />
				<h4 class="mt-4 font-light">
					This is a new lesson. To start, click on "Generate Lesson" button.
				</h4>
				<button class="variant-filled btn mt-4" type="submit"> Generate Lesson </button>
			</form>
		{/if}
		<Markdown class="mb-10" content={lessonMdn} />
	</article>
</main>
