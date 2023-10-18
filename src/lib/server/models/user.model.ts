import mongoose, { Schema, Document } from 'mongoose';


export enum SkillCategory {
  FRONT_END = 'front_end',
  BACK_END = 'back_end',
  FULL_STACK = 'full_stack',
  DEV_OPS = 'dev_ops',
  MOBILE = 'mobile',
  MACHINE_LEARNING = 'machine_learning',
  OTHER = 'other',
}
export const SkillCategoryValues = Object.values(SkillCategory);

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
