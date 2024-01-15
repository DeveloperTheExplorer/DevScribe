import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types"

import { CourseService } from "$lib/server/services/course.service";
import { toObject } from "$lib/utils/mongo.util";
import type { ICourse } from "$lib/types/course.type";

export const load: PageServerLoad = async ({ params, parent }) => {
  const { session } = await parent();

  if (!session?.user) {
    error(401, {
      message: 'Unauthorized',
    });
  }

  const courses = await CourseService.getCoursesByUserId(session.user.id!);

  return {
    courses: courses.map(toObject<ICourse>),
  }
}