import { error } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

import { CourseService } from '$lib/server/services/course.service';

export const load: LayoutServerLoad = async ({ params, parent }) => {
	const { session } = await parent();
	const { slug } = params;

	if (!slug) {
		error(404, {
			message: 'Not Found'
		});
	}

	const course = await CourseService.getCourseByUnknownIdentifier(slug);

	if (!course) {
		error(404, {
			message: 'Not found'
		});
	}

	return {
		course
	};
};
