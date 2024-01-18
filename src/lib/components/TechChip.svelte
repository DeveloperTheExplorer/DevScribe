<script lang="ts">
	import { getTechnologyIconUrl } from '$lib/utils/technologies.util';

	export let tech: string;
	export let iconWidth: string = 'w-4';
</script>

<button {...$$restProps} class="variant-filled chip {$$restProps.class}" on:click>
	<img class="h-auto {iconWidth}" src={getTechnologyIconUrl(tech)} alt={tech} />
	<span>{tech}</span>
</button>
