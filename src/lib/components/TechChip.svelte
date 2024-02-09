<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { getTechnologyIconUrl } from '$lib/utils/technologies.util';

	export let tech: string;
	export let iconWidth: string = 'w-4';
	export let miniVariant: boolean = false;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: miniVariant ? `popupHover-${tech}` : '',
		placement: 'bottom'
	};
</script>

<button
	{...$$restProps}
	class="variant-filled btn chip [&>*]:pointer-events-none {$$restProps.class}"
	class:rounded-full={miniVariant}
	on:click
	use:popup={popupHover}
>
	<img class="h-auto {iconWidth}" src={getTechnologyIconUrl(tech)} alt={tech} />
	{#if !miniVariant}
		<span>{tech}</span>
	{/if}
</button>

{#if miniVariant}
	<div class="card variant-filled p-2" data-popup="popupHover-{tech}">
		<p class="font-mono text-xs">{tech}</p>
		<div class="variant-filled arrow" />
	</div>
{/if}
