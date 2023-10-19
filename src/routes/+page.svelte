<script>
  import { signIn, signOut } from "@auth/sveltekit/client"
  import { page } from "$app/stores"
</script>

<h1 class="text-5xl">SvelteKit Auth Example</h1>
<p>
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
    <button on:click={() => signOut()} class="button">Sign out</button>
  {:else}
    <span class="notSignedInText">You are not signed in</span>
    <button on:click={() => signIn("github")}>Sign In with GitHub</button>
    <a href="/auth/signin" class="buttonPrimary" data-sveltekit-preload-data="off">Sign in</a>
  {/if}
</p>