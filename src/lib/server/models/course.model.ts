import mongoose, { Document, Schema, Types } from "mongoose";

import { slugify } from "$lib/utils/string.util";

import { enumValues } from "$lib/utils/type.utils";
import { LessonStatus, type ICourse } from "$lib/types/course.type";


interface ICourseModel extends ICourse, Document { }

const LessonSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number },
  skills: [{ type: String }],
  difficulty: { type: Number },
  technologies: [{ type: String, required: true }],
  status: { type: String, enum: enumValues(LessonStatus), default: LessonStatus.NOT_STARTED, required: true },
  modelUsed: { type: String },
  content: { type: String },
  prompt: { type: String, required: true }
});

const ChapterSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true },
  skills: [{ type: String }],
  difficulty: { type: Number },
  technologies: [{ type: String, required: true }],
  modelUsed: { type: String, required: true },
  lessons: [LessonSchema],
});

const CourseSchema = new Schema({
  student: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  duration: { type: Number, required: true },
  process: { type: Number, default: 0 },
  skills: [{ type: String }],
  difficulty: { type: Number },
  technologies: [{ type: String, required: true }],
  chapters: [ChapterSchema],
  modelUsed: { type: String, required: true },
  prompt: { type: String, required: true },
  promptHash: { type: String, required: true },
  contentHash: { type: String, required: true, unique: true },
  content: { type: String, required: true }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
    }
  }
});

CourseSchema.pre<ICourseModel>('save', function (next) {

  let totalLessons = 0,
    completedLessons = 0;
  for (const chapter of this.chapters) {
    for (const lesson of chapter.lessons) {
      totalLessons++;
      if (lesson.status === LessonStatus.COMPLETED) {
        completedLessons++;
      }
    }
  }
  this.progress = Math.round((completedLessons / totalLessons) * 100);
  this.slug = slugify(this.name);
  next();
});

export const CourseModel = mongoose.model<ICourseModel>('Course', CourseSchema);