<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	
  import { browser } from '$app/environment';
	import Header from '$lib/components/Header.svelte';

	import '../app.postcss'; 

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  })
</script>

<QueryClientProvider client={queryClient}>
	<AppShell>
		<svelte:fragment slot="header"><Header /></svelte:fragment>
		<svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment>
		<!-- (sidebarRight) -->
		<svelte:fragment slot="pageHeader">Page Header</svelte:fragment>
		<!-- Router Slot -->
		<slot />
		<!-- ---- / ---- -->
		<!-- (pageFooter) -->
		<!-- (footer) -->
	</AppShell>
</QueryClientProvider>

