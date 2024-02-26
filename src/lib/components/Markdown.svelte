<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { marked } from 'marked';

	import { highlightAllCodeSnippets } from '$lib/utils/markdown.util';

	export let content = ``;

	console.log('content :>> ', content);

	afterUpdate(highlightAllCodeSnippets);
</script>

<div {...$$restProps} class="markdown-view max-w-full {$$restProps.class}">
	{#if content && content !== ''}
		{@html marked(content)}
	{/if}
</div>
