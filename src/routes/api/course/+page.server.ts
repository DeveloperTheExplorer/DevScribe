import { fail, json, type Actions } from "@sveltejs/kit";
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

import { DevScribeAIPlanner, type PromptMessage } from "$lib/server/services/devscribe-ai.service";

const postSchema = z.object({
  prompt: z.string(),
})

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, postSchema);

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    const { prompt } = form.data;
    const devscribeAI = new DevScribeAIPlanner();
    const promptMessage: PromptMessage = {
      role: "user",
      content: prompt as string,
    }
    const response = await devscribeAI.prompt([promptMessage]);
    console.log('response :>> ', response);

    return {
      form,
      response
    }
  }
} satisfies Actions;
// An app where you can see the weather live in your city.