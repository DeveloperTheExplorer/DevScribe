<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<div class="flex w-full flex-col items-center py-12">
	<h1 class="text-5xl">SvelteKit Auth Example</h1>
	{#if $page.data.session}
		{#if $page.data.session.user?.image}
			<div
				style="background-image: url('{$page.data.session.user.image}')"
				class="h-24 w-24 rounded-full bg-cover"
			/>
		{/if}
		<div class="flex flex-col items-center justify-between">
			<small>Signed in as</small><br />
			<strong>{$page.data.session.user?.name ?? 'User'}</strong>
			<a href="/course/gen">Make a new course.</a>
		</div>
		<button class="variant-filled-warning btn mt-4" on:click={() => signOut()}>Sign out</button>
	{:else}
		<div class="text-lg">You are not signed in</div>
		<div class="mt-2 flex flex-row gap-2">
			<button class="variant-filled btn" on:click={() => signIn('github')}>
				Sign In with GitHub
			</button>
			<button class="variant-ringed btn" on:click={() => signIn('google')}>
				Sign In with Google
			</button>
		</div>
	{/if}
</div>
