<script lang="ts">
  import { signIn, signOut } from "@auth/sveltekit/client"
  import { page } from "$app/stores"
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
    <div class="flex flex-col justify-between items-center">
      <small>Signed in as</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
      <a href="/course/gen">Make a new course.</a>
    </div>
    <button class='btn variant-filled-warning mt-4' on:click={() => signOut()}>Sign out</button>
  {:else}
    <div class="text-lg">You are not signed in</div>
    <div class="flex flex-row gap-2 mt-2">
      <button 
        class="btn variant-filled" 
        on:click={() => signIn("github")}
      >
        Sign In with GitHub
      </button>
      <button 
        class="btn variant-ringed"
        on:click={() => signIn("google")}
      >
        Sign In with Google
      </button>
    </div>
  {/if}
  </div>