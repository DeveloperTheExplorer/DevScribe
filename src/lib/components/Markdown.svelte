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

	export let content = `Marked - Markdown Parser
========================

[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.

How To Use The Demo
-------------------

1. Type in stuff on the left.
2. See the live updates on the right.

That's it.  Pretty simple.  There's also a drop-down option above to switch between various views:

- **Preview:**  A live display of the generated HTML as it would render in a browser.
- **HTML Source:**  The generated HTML before your browser makes it pretty.
- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.
- **Quick Reference:**  A brief run-down of how to format things using markdown.

Why Markdown?
-------------

It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

Ready to start writing?  Either start changing stuff on the left or
[clear everything](/demo/?text=) with a simple click.

[Marked]: https://github.com/markedjs/marked/
[Markdown]: http://daringfireball.net/projects/markdown/

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
	@apply h-full overflow-hidden;
}

input,
button,
input:focus,
button:focus {
	outline: none;
}
\`\`\`
`;
</script>

<div {...$$restProps} class="markdown-view max-w-full {$$restProps.class}">
	{@html marked(content)}
</div>
