<script lang="ts">
	import type { ICourse } from '$lib/types/course.type';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import TechList from '$lib/components/TechList.svelte';

	export let course: ICourse;
</script>

<div class="flex flex-col {$$restProps.class}">
	<div class="flex flex-row items-stretch justify-between">
		<div class="flex h-full flex-col justify-between gap-2">
			<h3>{course.name}</h3>
			{#if course.description}
				<p>{course.description}</p>
			{/if}
			<p class="text-surface-500">Duration: {course.duration} days</p>
		</div>

		<div class="flex flex-col items-center gap-2">
			<ProgressRadial width="w-20" font={80} value={course.progress}>
				{course.progress}%
			</ProgressRadial>
			<p class="whitespace-nowrap text-center">{course.chapters.length} Chapters</p>
		</div>
	</div>
	<TechList class="mt-4" techs={course.technologies} />
</div>
