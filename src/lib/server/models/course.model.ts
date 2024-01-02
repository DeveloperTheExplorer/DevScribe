import mongoose, { Document, Schema, Types } from "mongoose";
import type { SkillCategory } from "./user.model";

export interface ILesson {
  name: string;
  description?: string;
  duration?: number;
  skills?: SkillCategory[];
  difficulty?: number;
  technologies: string[];
  content?: string;
  prompt: string;
}

export interface IChapter {
  name: string;
  description?: string;
  duration: number;
  skills?: SkillCategory[];
  difficulty?: number;
  technologies: string[];
  lessons: ILesson[];
}

export interface ICourse {
  student: Types.ObjectId;
  name: string;
  description?: string;
  duration: number;
  skills: SkillCategory[];
  difficulty?: number;
  technologies: string[];
  chapters: IChapter[];
  prompt: string;
  promptHash: string;
  contentHash: string;
  content: string;
}

interface ICourseModel extends ICourse, Document { }

const LessonSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number },
  skills: [{ type: String }],
  difficulty: { type: Number },
  technologies: [{ type: String, required: true }],
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
  lessons: [LessonSchema],
});

const CourseSchema = new Schema({
  student: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true },
  skills: [{ type: String }],
  difficulty: { type: Number },
  technologies: [{ type: String, required: true }],
  chapters: [ChapterSchema],
  prompt: { type: String, required: true },
  promptHash: { type: String, required: true },
  contentHash: { type: String, required: true, unique: true },
  content: { type: String, required: true }
});

export const CourseModel = mongoose.model<ICourseModel>('Course', CourseSchema);