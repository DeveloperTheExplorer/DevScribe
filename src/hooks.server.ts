import { SvelteKitAuth } from "@auth/sveltekit";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
// import Apple from "@auth/core/providers/apple";

import { AUTH_SECRET, AUTH_GITHUB_ID, AUTH_GITHUB_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_APPLE_ID, AUTH_APPLE_SECRET } from "$env/static/private";
import { mongoDbClient } from "$lib/server/db";
import { sequence } from "@sveltejs/kit/hooks";
import { redirect, type Handle } from "@sveltejs/kit";

const authorization: Handle = async ({ event, resolve }) => {
  // Protect any routes under /authenticated
  if (event.url.pathname.includes("/private")) {
    const session = await event.locals.getSession();
    if (!session) {
      redirect(303, "/auth");
    }
  }

  // If the request is still here, just proceed as normally
  return resolve(event);
}


export const handle = sequence(
  SvelteKitAuth({
    adapter: MongoDBAdapter(mongoDbClient),
    providers: [
      GitHub({ clientId: AUTH_GITHUB_ID, clientSecret: AUTH_GITHUB_SECRET }),
      Google({ clientId: AUTH_GOOGLE_ID, clientSecret: AUTH_GOOGLE_SECRET }),
      // Apple({ clientId: AUTH_APPLE_ID, clientSecret: AUTH_APPLE_SECRET }), // Apple requires you to join the developer program
    ],
    secret: AUTH_SECRET,
    callbacks: {
      async session({ session, user }) {
        return {
          ...session,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          }
        }
      }
    }
  }),
  authorization,
)