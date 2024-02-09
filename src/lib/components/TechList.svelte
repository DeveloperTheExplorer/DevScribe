<script lang="ts">
	import TechChip from '$lib/components/TechChip.svelte';

	export let techs: string[] = [];
	export let miniVariant: boolean = false;
</script>

<div
	class="flex w-full flex-row flex-wrap items-center {$$restProps.class}"
	class:gap-2={!miniVariant}
	class:gap-1={miniVariant}
>
	{#each techs as tech, index}
		<TechChip {tech} {miniVariant} />
	{/each}
</div>
