import Mongoose from 'mongoose';

import { CourseModel } from '../models/course.model';
import type { RawCourse } from '../types';


import { HashType, determineHashType, hashValue } from '$lib/utils/hash.util';
import { slugify } from '$lib/utils/string.util';
import { extractTechnologiesFromText } from '$lib/utils/technologies.util';
import type { ICourse } from '$lib/types/course.type';
import { SkillCategory } from '$lib/types/skill-category.types';

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

  async getCourseBySlug(slug: string) {
    return await CourseModel.findOne({ slug });
  }

  async getCourseByPrompt(prompt: string) {
    return await CourseModel.findOne({ promptHash: hashValue(prompt) });
  }

  async getCourseByContentHash(contentHash: string) {
    return await CourseModel.findOne({ contentHash });
  }

  async getCoursesByUserId(student: string) {
    return await CourseModel.find({ student }).sort({ progress: -1 });
  }

  async getCourseByUnknownIdentifier(identifier: string) {
    const slugType = determineHashType(identifier);

    if (slugType === HashType.HASH) {
      return this.getCourseByContentHash(identifier);
    }
    if (slugType === HashType.OBJECT_ID) {
      return this.getCourse(identifier);
    }

    return this.getCourseBySlug(identifier);
  }

  async newCourse(course: string, prompt: string, modelUsed: string, userId: Mongoose.Types.ObjectId) {
    const rawCourseObj = JSON.parse(course) as RawCourse;
    const courseObj: ICourse = {
      student: userId,
      name: rawCourseObj.intro.name,
      description: rawCourseObj.intro.description,
      duration: rawCourseObj.plan.reduce((acc, plan) => acc + plan.duration, 0),
      skills: [SkillCategory.FULL_STACK],
      technologies: rawCourseObj.intro.techStack,
      modelUsed,
      chapters: rawCourseObj.plan.map((plan) => ({
        name: `${plan.title} | ${rawCourseObj.intro.name}`,
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

  async addLesson(courseId: string, lessonContent: string, prompt: string, modelUsed: string, chapterIndex: number, lessonIndex: number) {
    const course = await CourseModel.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const lesson = course.chapters[chapterIndex].lessons[lessonIndex];

    if (lesson.content && lesson.prompt) {
      throw new Error('Lesson already exists');
    }

    course.chapters[chapterIndex].lessons[lessonIndex] = {
      ...lesson,
      content: lessonContent,
      prompt,
      modelUsed,
      technologies: extractTechnologiesFromText(lessonContent),
    };

    course.markModified('chapters');
    course.save();

    return course;
  }
}

const courseService = CourseService.get();

export { courseService as CourseService };