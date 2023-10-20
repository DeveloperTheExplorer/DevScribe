import { SvelteKitAuth } from "@auth/sveltekit";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Apple from "@auth/core/providers/apple";

import { AUTH_SECRET, AUTH_GITHUB_ID, AUTH_GITHUB_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_APPLE_ID, AUTH_APPLE_SECRET } from "$env/static/private";
import { mongoDbClient } from "$lib/server/db";

export const handle = SvelteKitAuth({
  adapter: MongoDBAdapter(mongoDbClient),
  providers: [
    GitHub({ clientId: AUTH_GITHUB_ID, clientSecret: AUTH_GITHUB_SECRET }),
    Google({ clientId: AUTH_GOOGLE_ID, clientSecret: AUTH_GOOGLE_SECRET }),
    // Apple({ clientId: AUTH_APPLE_ID, clientSecret: AUTH_APPLE_SECRET }), // Apple requires you to join the developer program
  ],
  secret: AUTH_SECRET
});