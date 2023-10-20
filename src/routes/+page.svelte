<script lang="ts">
  import { signIn, signOut } from "@auth/sveltekit/client"
  import { page } from "$app/stores"
  import Button from '$lib/components/Button.svelte'
</script>

<div class="flex flex-col items-center w-full py-12">
  <h1 class="text-5xl">SvelteKit Auth Example</h1>
  {#if $page.data.session}
    {#if $page.data.session.user?.image}
      <div
        style="background-image: url('{$page.data.session.user.image}')"
        class="w-24 h-24 bg-cover rounded-full"
      />
    {/if}
    <div class="signedInText">
      <small>Signed in as</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </div>
    <Button on:click={() => signOut()} danger>Sign out</Button>
  {:else}
    <div class="text-lg">You are not signed in</div>
    <div class="flex flex-row gap-2 mt-2">
      <Button on:click={() => signIn("github")} tertiary id='abc'>
        Sign In with GitHub
      </Button>
      <Button on:click={() => signIn("google")} primary>
        Sign In with Google
      </Button>
    </div>
  {/if}
  </div>