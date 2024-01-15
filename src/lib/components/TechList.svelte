<script lang="ts">
	import TechChip from '$lib/components/TechChip.svelte';

	export let techs: string[] = [];
</script>

<div class="flex w-full flex-row flex-wrap items-center gap-2 {$$restProps.class}">
	{#each techs as tech}
		<TechChip {tech} />
	{/each}
</div>
