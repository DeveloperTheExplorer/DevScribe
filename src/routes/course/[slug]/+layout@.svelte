<script lang="ts">
	import type { PageData } from './$types';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import List from 'virtual:icons/tabler/list';

	import CourseSidebar from '$lib/components/CourseSidebar.svelte';

	export let data: PageData;
	initializeStores();

	const drawerStore = getDrawerStore();
	const { course } = data;

	const drawerOpen = () => {
		drawerStore.open({});
	};
</script>

<Drawer>
	<CourseSidebar {course} />
</Drawer>

<button
	on:click={drawerOpen}
	type="button"
	class="variant-filled btn-icon fixed bottom-0 left-0 z-10 m-4 flex lg:hidden"
>
	<List />
</button>

<div class="relative flex flex-row">
	<!-- (sidebarLeft) -->
	<div class="sticky top-0 hidden h-screen w-[36rem] lg:block">
		<CourseSidebar {course} class="h-screen overflow-y-auto pb-24" />
	</div>

	<slot />
</div>
