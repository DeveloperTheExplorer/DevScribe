import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types"

import { CourseService } from "$lib/server/services/course.service";
import type { ICourse } from "$lib/types/course.type";
import { toObject } from "$lib/utils/mongo.util";

export const load: PageServerLoad = async ({ params, parent }) => {
  const { session } = await parent();
  const { slug } = params;

  if (!slug) {
    error(404, {
      message: 'Not Found',
    })
  }

  const course = await CourseService.getCourseByUnknownIdentifier(slug);

  if (!course) {
    error(404, {
      message: 'Not found',
    })
  }

  return {
    course: toObject<ICourse>(course),
  }
}