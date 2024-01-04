import Mongoose from 'mongoose';

import { CourseModel, type ICourse } from '../models/course.model';
import type { RawCourse } from '../types';

import { hashValue } from '$lib/utils/hash.util';
import { extractTechnologiesFromText } from '$lib/utils/technologies.util';
import { SkillCategory } from '../models/user.model';

class CourseService {

  private static instance: CourseService;

  private constructor() { }

  static get(): CourseService {
    if (!CourseService.instance) {
      CourseService.instance = new CourseService();
    }
    return CourseService.instance;
  }

  async getCourse(courseId: string) {
    return await CourseModel.findById(courseId);
  }

  async getCourseByPrompt(prompt: string) {
    const promptHash = hashValue(prompt);

    return await CourseModel.findOne({ promptHash });
  }

  async getCourseByContentHash(contentHash: string) {
    return await CourseModel.findOne({ contentHash });
  }

  async newCourse(course: string, prompt: string, modelUsed: string, userId: Mongoose.Types.ObjectId) {
    const rawCourseObj = JSON.parse(course) as RawCourse;
    const courseObj: ICourse = {
      student: userId,
      name: rawCourseObj.intro.name,
      duration: rawCourseObj.plan.reduce((acc, plan) => acc + plan.duration, 0),
      skills: [SkillCategory.FULL_STACK],
      technologies: rawCourseObj.intro.techStack,
      modelUsed,
      chapters: rawCourseObj.plan.map((plan) => ({
        name: `${plan.title} | ${rawCourseObj.intro.name}}`,
        duration: plan.duration,
        modelUsed,
        lessons: plan.plan.map((lesson) => ({
          name: lesson,
          technologies: extractTechnologiesFromText(lesson),
          prompt: lesson,
        })),
        technologies: extractTechnologiesFromText(plan.plan.join('. ')),
      })),
      prompt,
      promptHash: hashValue(prompt),
      contentHash: hashValue(course),
      content: course
    }
    const newCourse = new CourseModel(courseObj);
    newCourse.save();

    return newCourse;
  }
}

const courseService = CourseService.get();

export { courseService as CourseService };