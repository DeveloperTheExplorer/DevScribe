<script lang="ts">
	import Button from "$lib/components/Button.svelte";
  import type { PageData } from './$types';
  import { page } from '$app/stores';
  import { superForm } from 'sveltekit-superforms/client';

  export let data: PageData;

  const { form, errors, constraints, enhance, delayed, message } = superForm(data.form);


</script>

<main>
  <h1>Search Page</h1>
  <form action="/api/course" method="post">
    <input name="prompt" type="text" placeholder="Search...">
    <Button primary>Search</Button>
  </form>
</main>
