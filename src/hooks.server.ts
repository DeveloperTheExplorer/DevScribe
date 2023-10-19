import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Apple from "@auth/core/providers/apple";

import { GITHUB_ID, GITHUB_SECRET, AUTH_SECRET } from "$env/static/private";

export const handle = SvelteKitAuth({
  providers: [
    GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
    Google({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
    Apple({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
  ],
  secret: AUTH_SECRET
});