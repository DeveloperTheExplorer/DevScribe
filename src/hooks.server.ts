import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Handle } from '@sveltejs/kit';

import { handle as authenticationHandle } from './auth';
import { RequestContext } from '@mikro-orm/mysql';
import { orm } from '$lib/server/db';

const authorizationHandle: Handle = async ({ event, resolve }) => {
	// Protect any routes under /authenticated
	if (event.url.pathname.includes('/private')) {
		const session = await event.locals.getSession();
		if (!session) {
			redirect(303, '/auth');
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
};

const mikroHandle: Handle = async ({ event, resolve }) => {
	const next = async () => await resolve(event);

	return RequestContext.create(orm.em, next);
};

export const handle: Handle = sequence(authenticationHandle, authorizationHandle, mikroHandle);
