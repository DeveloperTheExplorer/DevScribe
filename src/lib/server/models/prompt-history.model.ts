import { Schema, model } from 'mongoose';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

export enum PrompotRole {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
}

export interface IPrompt {
  role: PrompotRole;
  content: string;
}

export interface IPromptHistory extends Document {
  user: Schema.Types.ObjectId;
  model: ChatCompletionCreateParamsBase['model'];
  hash: string;
  prompts: IPrompt[];
  response: IPrompt[];
  approved?: boolean;
  tokensUsed: number;
  timestamp: Date;
}

export const PromptSchema = new Schema({
  role: {
    type: String,
    enum: Object.values(PrompotRole),
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const PromptHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  model: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true,
    unique: true
  },
  prompt: {
    type: [PromptSchema],
    required: true
  },
  response: {
    type: [PromptSchema],
    required: true
  },
  tokensUsed: {
    type: Number,
    required: true
  },
  approved: {
    type: Boolean
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default model('AIPrompts', PromptHistorySchema);
