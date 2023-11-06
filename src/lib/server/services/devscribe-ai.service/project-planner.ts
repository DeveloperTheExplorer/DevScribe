import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';
import { DevScribeAI } from '.'
import type { PromptMessage } from '.';

const context: PromptMessage[] = [
  {
    "role": "system",
    "content": "Your goal is to mentor a beginner on their journey to learning to become a web software engineer. \n\nTheir goal is to create an application.\n\nBased on application the user wants to create and the desired minimum tech stack, provide a 28 day plan (chapter by chapter). The plan structure should contain periods for: \n1. Learning: learning enough about the technologies in the project so that they are familiar with concepts as they code.\n2. Setup: Setting up their development environment with the needed technologies and designing the needed architecture for the project.\n3. Implementation: Start developing and writing code.\n\nFirst provide a project name (max: 10 words) and description (max: 30 words) JSON object in the following format:\n{ \"name\": {NAME}, \"description\": {DESCRIPTION} },\n\nThen, for each chapter, provide the plan in a JSON object comma separated from other days. Each chapter must have duration (number of days) and plan. Format:\n{ \"duration\": {DAYS_COUNT}, \"plan\":  {PLAN} }\n"
  },
  {
    "role": "user",
    "content": "application: You are presented with an outfit based on your current closet items and based on the weather where the user resides;\ntech-stack: HTML, CSS, JavaScript, Node.js, Express.js, MongoDB"
  },
  {
    "role": "assistant",
    "content": "{\n  \"name\": \"Closet-to-Weather Outfit Recommender\",\n  \"description\": \"Build a weather-responsive closet management and outfit recommendation application\"\n},\n{\n  \"duration\": 5, \n  \"plan\": \"- Introduction to HTML, CSS and JavaScript\n- Understanding of web development fundamentals and responsive design\n- Explore APIs, in particular weather APIs\n- Introduction to Node.js and Express.js for backend development\n- Understanding of MongoDB for database management\"\n},\n{\n  \"duration\": 3,\n  \"plan\": \"- Installing and setting up VSCode, Node.js, Express.js, MongoDB.\n- Set up Github for version control and commit initial project structure\n- Create initial project structure\n- Plan and design database model\"\n},\n{\n  \"duration\": 20,\n  \"plan\": \"- Implement backend routes (CRUD operations for closet items, user profile, outfit suggestions)\n- Integration of weather API\n- Implement frontend (user registration, login, view/add/delete closet items, view outfit suggestions)\n- Connect frontend to backend\"\n}"
  },
  {
    "role": "user",
    "content": "application: you can schedule your day with todo items. Todos are ordered and have a duration and importance property;\ntech-stack: HTML, CSS, JavaScript, Next.js, Prisma"
  },
  {
    "role": "assistant",
    "content": "{\n  \"name\": \"Day-Scheduler Todo Application\",\n  \"description\": \"An advanced todo scheduler app prioritizing tasks based on time, duration, and importance\"\n},\n{\n  \"duration\": 5, \n  \"plan\": \"- Introduction to HTML, CSS, and JavaScript\n- Basics of web development and responsive design\n- Introduction to Next.js and exploration of its features, such as Server-Side Rendering and Static Site Generation\n- Explore Prisma, an open-source database toolkit\"\n},\n{\n  \"duration\": 3, \n  \"plan\": \"- Install and set up text editor (such as VSCode), Node.js, Next.js, Prisma\n- Set up Github for version control and commit initial project structure\n- Design application layout and data model\"\n},\n{\n  \"duration\": 20,\n  \"plan\": \"- Implement backend functionality: routes for creating, reading, updating, and deleting Todo items\n- Implement frontend (User registration page, Login page, Dashboard, Todo CRUD pages)\n- Connect frontend and backend\n- Deploy the application, troubleshoot and fix bugs, and make the final launch ready\"\n}"
  }
]

export class DevScribeAIProjectPlanner extends DevScribeAI {

  constructor(options?: Partial<ChatCompletionCreateParamsBase>) {
    super(context, {
      model: 'gpt-3.5-turbo',
      ...options
    });
  }
}