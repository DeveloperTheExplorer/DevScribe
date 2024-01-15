import mongoose, { Schema, Document } from 'mongoose';

import { SkillCategoryValues, SkillCategory } from '$lib/types/skill-category.types';

export interface IUser extends Document {
  name: string;
  email: string;
  skills: ISkill[];
}
export interface ISkill {
  name: string;
  description?: string;
  category: SkillCategory;
  skillLevel?: number;
  tags?: string[];
}

const SkillsSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    enum: SkillCategoryValues,
    default: SkillCategory.OTHER,
  },
  skillLevel: { type: Number, default: 0 },
  tags: { type: [String] }
});

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: {
    type: [SkillsSchema],
    default: [],
  }
});

export default mongoose.model<IUser>('User', UserSchema);
