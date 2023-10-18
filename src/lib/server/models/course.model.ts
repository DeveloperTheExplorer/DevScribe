import mongoose, { Document, Schema } from "mongoose";
import type { SkillCategory } from "./user.model";

export interface ILesson {
  name: string;
  description?: string;
  duration: number;
  skills?: SkillCategory[];
  difficulty: number;
  technologies: string[];
  content: string;
  prompt: Schema.Types.ObjectId;
}

export interface IChapter {
  name: string;
  description?: string;
  duration: number;
  skills?: SkillCategory[];
  difficulty: number;
  technologies: string[];
  lessons: ILesson[];
  prompt: Schema.Types.ObjectId;
}

export interface ICourse extends Document {
  student: Schema.Types.ObjectId;
  objective: string;
  description?: string;
  duration: number;
  skills: SkillCategory[];
  difficulty: number;
  technologies: string[];
  chapters: IChapter[];
}

const LessonSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true },
  skills: [{ type: String }],
  difficulty: { type: Number, required: true },
  technologies: [{ type: String, required: true }],
  content: { type: String, required: true }
});

const ChapterSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true },
  skills: [{ type: String }],
  difficulty: { type: Number, required: true },
  technologies: [{ type: String, required: true }],
  lessons: [LessonSchema]
});

const CourseSchema = new Schema({
  student: { type: Schema.Types.ObjectId, required: true },
  objective: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true },
  skills: [{ type: String }],
  difficulty: { type: Number, required: true },
  technologies: [{ type: String, required: true }],
  chapters: [ChapterSchema]
});

export default mongoose.model<ICourse>('Course', CourseSchema);