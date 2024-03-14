import { SvelteKitAuth } from '@auth/sveltekit';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
// import Apple from "@auth/core/providers/apple";

import {
	AUTH_SECRET,
	AUTH_GITHUB_ID,
	AUTH_GITHUB_SECRET,
	AUTH_GOOGLE_ID,
	AUTH_GOOGLE_SECRET,
	AUTH_APPLE_ID,
	AUTH_APPLE_SECRET
} from '$env/static/private';
import { db } from '$lib/server/db';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: DrizzleAdapter(db),
	providers: [
		GitHub({ clientId: AUTH_GITHUB_ID, clientSecret: AUTH_GITHUB_SECRET }),
		Google({ clientId: AUTH_GOOGLE_ID, clientSecret: AUTH_GOOGLE_SECRET })
		// Apple({ clientId: AUTH_APPLE_ID, clientSecret: AUTH_APPLE_SECRET }), // Apple requires you to join the developer program
	],
	secret: AUTH_SECRET,
	trustHost: true,
	debug: true,
	callbacks: {
		async session({ session, user }) {
			return {
				...session,
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image
				}
			};
		}
	},
	logger: {
		error(code, ...message) {
			console.log('LOGGER ERROR :>>>', code, JSON.stringify(message, null, 4));
		},
		warn(code, ...message) {
			console.log('LOGGER WARN :>>>', code, JSON.stringify(message, null, 4));
		},
		debug(code, ...message) {
			console.log('LOGGER DEBUG :>>>', code, JSON.stringify(message, null, 4));
		}
	}
});
