<script lang="ts">
	import type { ICourse } from '$lib/types/course.type';

	export let course: ICourse;
</script>

<div class="shadow-m sticky top-0 flex h-screen w-1/4 flex-col bg-surface-100 p-2">
	<div class="flex flex-col gap-2 p-4">
		<h3>{course.name}</h3>
		<p class="text-surface-500">Duration: {course.duration} days</p>
		<p>{course.chapters.length} Chapters</p>
	</div>

	<div class="flex flex-col items-center gap-4">
		<h4>Technologies</h4>
		<ul class="list-disc">
			{#each course.technologies as tech}
				<li>{tech}</li>
			{/each}
		</ul>
	</div>

	<div class="mt-4 flex w-full flex-col items-center gap-4">
		{#each course.chapters as chapter}
			<div class="flex w-2/3 flex-col gap-2">
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
