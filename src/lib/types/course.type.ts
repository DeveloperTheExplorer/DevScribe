import type { Types } from "mongoose";
import type { SkillCategory } from "./skill-category.types";


export enum LessonStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface ILesson {
  name: string;
  description?: string;
  duration?: number;
  skills?: SkillCategory[];
  difficulty?: number;
  technologies: string[];
  status?: LessonStatus;
  modelUsed?: string;
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
  modelUsed: string;
  lessons: ILesson[];
}

export interface ICourse {
  student: Types.ObjectId | string;
  name: string;
  description?: string;
  slug?: string;
  duration: number;
  progress?: number;
  skills: SkillCategory[];
  difficulty?: number;
  technologies: string[];
  chapters: IChapter[];
  modelUsed: string;
  prompt: string;
  promptHash: string;
  contentHash: string;
  content: string;
}