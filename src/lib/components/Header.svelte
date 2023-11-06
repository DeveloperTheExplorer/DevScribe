<script lang="ts">
import { AppBar } from '@skeletonlabs/skeleton';
import Sparkle from 'virtual:icons/ph/sparkle';
import Files from 'virtual:icons/ph/files';
import Power from 'virtual:icons/ph/power';

import { signOut } from '@auth/sveltekit/client';

</script>

<AppBar>
	<svelte:fragment slot="lead">
    D
  </svelte:fragment>
  <a href="/">
    DevScribe
  </a>
	<svelte:fragment slot="trail">
    <div class="flex flex-row gap-8 px-4">
      <a class="flex items-center gap-2" href="/course/gen"><Sparkle /> New Course</a>
      <a class="flex items-center gap-2" href="/course/search"><Files /> Explore Courses</a>
      <button class="flex items-center gap-2" on:click={() => signOut()}><Power /> Log Out</button>
    </div>
  </svelte:fragment>
</AppBar>
