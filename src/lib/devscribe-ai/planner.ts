import { DevScribeAI } from '.'
import type { PromptMessage } from '.';

const context: PromptMessage[] = [
  {
    "role": "system",
    "content": "Your goal is to mentor a beginner on their journey to learning to become a web software engineer. \n\nTheir goal is to create an application.\n\nBased on application the user wants to create, provide a 30 day plan (day by day) for the user to learn to code this application, provide the overall stack of the application and a brief introduction for the project (less than 30 words).\n\nProvide the results in the following JSON format.\n\n- key: intro, value: introduction of project\n- key: plan, value: array of objects containing date range & plan"
  },
  {
    "role": "user",
    "content": "An application where you are presented with an outfit based on your current closet items and based on the weather where the user resides."
  },
  {
    "role": "assistant",
    "content": "{\n  \"intro\": \"Closet-to-Weather Outfit Recommender\",\n  \"plan\": [\n    {\n      \"date_range\": \"Day 1\",\n      \"plan\": \"Learn HTML and CSS basics\"\n    },\n    {\n      \"date_range\": \"Day 2-3\",\n      \"plan\": \"Learn JavaScript fundamentals\"\n    },\n    {\n      \"date_range\": \"Day 4\",\n      \"plan\": \"Learn how to fetch weather data using an API\"\n    },\n    {\n      \"date_range\": \"Day 5-7\",\n      \"plan\": \"Build a static webpage to display user's closet items\"\n    },\n    {\n      \"date_range\": \"Day 8-10\",\n      \"plan\": \"Implement logic to retrieve and update closet items\"\n    },\n    {\n      \"date_range\": \"Day 11-13\",\n      \"plan\": \"Integrate weather API and display weather information\"\n    },\n    {\n      \"date_range\": \"Day 14-17\",\n      \"plan\": \"Create an algorithm to recommend outfit based on closet items and weather\"\n    },\n    {\n      \"date_range\": \"Day 18-20\",\n      \"plan\": \"Implement outfit recommendation feature\"\n    },\n    {\n      \"date_range\": \"Day 21-24\",\n      \"plan\": \"Add user authentication and storage for persistent data\"\n    },\n    {\n      \"date_range\": \"Day 25-27\",\n      \"plan\": \"Improve UI/UX with CSS frameworks and design principles\"\n    },\n    {\n      \"date_range\": \"Day 28-29\",\n      \"plan\": \"Perform testing and bug-fixing\"\n    },\n    {\n      \"date_range\": \"Day 30\",\n      \"plan\": \"Deploy the application and share it with friends for feedback\"\n    }\n  ]\n}"
  }
]

export class DevScribeAIPlanner extends DevScribeAI {

  constructor() {
    super(context, {
      model: 'gpt-3.5-turbo'
    });
  }
}