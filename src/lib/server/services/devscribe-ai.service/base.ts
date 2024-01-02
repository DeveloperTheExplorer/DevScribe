import { OpenAIStream, type OpenAIStreamCallbacks } from 'ai';
import OpenAI from 'openai';
import type { ChatCompletion, ChatCompletionChunk, ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';
import { OPENAI_API_KEY } from '$env/static/private'
import type { Stream } from 'openai/streaming';

export interface PromptMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * DevScribeAI
 * This class will be responsible for all AI code suggestion and planning tasks.
 */
export class DevScribeAI {
  // Create a wrapper around openAI methods
  private ai: OpenAI;

  options: Omit<ChatCompletionCreateParamsBase, 'messages'> = {
    model: 'gpt-3.5-turbo',
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }

  contextMessages: PromptMessage[] = [];

  constructor(setupMessages: PromptMessage[], options?: Partial<ChatCompletionCreateParamsBase>) {
    this.ai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
    this.contextMessages = setupMessages;
    this.options = {
      ...this.options,
      ...options,
    };
  }

  /**
   * prompt
   * This method will be responsible for getting the AI response from OpenAI.
   * @param prompt 
   * @returns 
   */
  async prompt(messages: PromptMessage[], callbacks?: OpenAIStreamCallbacks): Promise<{
    response: Stream<ChatCompletionChunk> | ChatCompletion;
    stream: ReadableStream<any>;
  }> {
    const allMessages = [...this.contextMessages, ...messages];
    const response = await this.ai.chat.completions.create({
      ...this.options,
      messages: allMessages
    });

    const stream = OpenAIStream(response as Stream<ChatCompletionChunk>, callbacks);

    return { response, stream };
  }
}