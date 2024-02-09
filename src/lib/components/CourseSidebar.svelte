<script lang="ts">
	import type { ICourse } from '$lib/types/course.type';
	import { queryParam } from 'sveltekit-search-params';

	import TechList from './TechList.svelte';
	import CourseSummary from './CourseSummary.svelte';

	export let course: ICourse;

	const chapterIndex = queryParam('chapter', {
		encode: (value: number) => value.toString(),
		decode: (value: string | null) => (value ? parseInt(value) : null)
	});
	const lessonIndex = queryParam('lesson', {
		encode: (value: number) => value.toString(),
		decode: (value: string | null) => (value ? parseInt(value) : null)
	});
	$: activeChapterIndex = chapterIndex || 0;
	$: activeLessonIndex = lessonIndex || 0;

	const handleUpdatePageParams = (chapterIndex: number, lessonIndex: number) => {
		$chapterIndex = chapterIndex;
		$lessonIndex = lessonIndex;
	};
</script>

<div class="shadow-m flex flex-col bg-surface-100 {$$restProps.class}">
	<div class="flex flex-col p-4">
		<div class="flex flex-row gap-2 rounded-lg bg-surface-50 p-4">
			<CourseSummary class="px-3" {course} />
			<!-- <div class="flex flex-col">
				<h3>{course.name}</h3>
				<p>{course.description}</p>
				<p class="text-surface-500">Duration: {course.duration} days</p>
				<p>{course.chapters.length} Chapters</p>
				<TechList techs={course.technologies} />
			</div> -->
		</div>

		<div class="mt-4 flex w-full flex-col gap-4">
			{#each course.chapters as chapter, chapterIndex}
				<div class="mt-4 flex flex-col gap-2 rounded-lg bg-surface-50 p-4">
					<div class="flex flex-col gap-2">
						<div class="flex flex-row items-start gap-2">
							<span class="badge bg-surface-200 text-base">#{chapterIndex + 1}</span>
							<h4>{chapter.name}</h4>
						</div>
						<p>Duration: {chapter.duration} day(s)</p>
						<TechList class="mt-2" techs={chapter.technologies} miniVariant />
					</div>

					<ul class="mt-2 flex flex-col gap-4">
						<button
							class="flex w-full flex-row gap-2 rounded p-2 pl-0 hover:bg-surface-200"
							on:click={() => handleUpdatePageParams(chapterIndex + 1, 0)}
						>
							<span class="badge bg-surface-200">#{chapterIndex + 1}.0</span>
							<span class="flex-auto">
								<dt class="w-full whitespace-normal text-left">{chapter.name}</dt>
							</span>
						</button>
						{#each chapter.lessons as lesson, lessonIndex}
							<button
								class="flex w-full flex-row gap-2 rounded p-2 pl-0 hover:bg-surface-200"
								on:click={() => handleUpdatePageParams(chapterIndex, lessonIndex + 1)}
							>
								<span class="badge bg-surface-200">#{chapterIndex + 1}.{lessonIndex + 1}</span>
								<span class="flex-auto">
									<dt class="w-full whitespace-normal text-left">{lesson.name}</dt>
								</span>
							</button>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</div>
