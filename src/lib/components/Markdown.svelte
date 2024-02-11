<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import hljs from 'highlight.js/lib/common';

	import { addCopyButtonToHljs } from '$lib/utils/markdown.util';

	onMount(() => {
		document.querySelectorAll('.markdown-view pre code').forEach((elem) => {
			if (!(elem instanceof HTMLElement)) return;
			hljs.highlightElement(elem);
			addCopyButtonToHljs({ el: elem, text: elem.innerText });
		});
	});

	export let content = ``;
</script>

<div {...$$restProps} class="markdown-view max-w-full {$$restProps.class}">
	{@html marked(content)}
</div>
