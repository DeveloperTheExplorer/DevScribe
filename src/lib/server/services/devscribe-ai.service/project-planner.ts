import { Types } from 'mongoose';
import type { OpenAIStreamCallbacks } from 'ai';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

import { DevScribeAI } from '.'
import type { PromptMessage } from '.';
import { CourseService } from '../course.service';

const context: PromptMessage[] = [
  {
    "role": "system",
    "content": "Your goal is to mentor a beginner on their journey to learning to become a web software engineer. \n\nTheir goal is to create an application.\n\nBased on application the user wants to create and the desired minimum tech stack, provide a 28 day plan (chapter by chapter). The plan structure should contain periods for: \n1. Learning: learning enough about the technologies in the project so that they are familiar with concepts as they code.\n2. Setup: Setting up their development environment with the needed technologies and designing the needed architecture for the project.\n3. Implementation: Start developing and writing code.\n\nIf no tech-stack is provided, create one for the user.\n\nFirst provide a project name (max: 10 words), description (max: 30 words) and techStack (array of strings) JSON object in the following format:\n{ \"name\": {NAME}, \"description\": {DESCRIPTION}, \"techStack\": {TECHSTACK} },\n\nThen, for each chapter, provide the plan in a JSON object comma separated from other days. Each chapter must have a title, duration (number of days) and plan. Format:\n{ \"title\": {TITLE}, \"duration\": {DAYS_COUNT}, \"plan\":  {PLAN} }\n"
  },
  {
    "role": "user",
    "content": "You are presented with an outfit based on your current closet items and based on the weather where the user resides;\ntech-stack: HTML, CSS, JavaScript, Node.js, Express.js, MongoDB"
  },
  {
    "role": "assistant",
    "content": "{\"intro\":{\"name\":\"Closet-to-Weather Outfit Recommender\",\"description\":\"Build a weather-responsive closet management and outfit recommendation application\",\"techStack\":[\"HTML\",\"CSS\",\"JavaScript\",\"Node.js\",\"Express.js\",\"MongoDB\"]},\"plan\":[{\"title\":\"Learning\",\"duration\":5,\"plan\":[\"Introduction to HTML, CSS and JavaScript\",\"Understanding of web development fundamentals and responsive design\",\"Explore APIs, in particular weather APIs\",\"Introduction to Node.js and Express.js for backend development\",\"Understanding of MongoDB for database management\"]},{\"title\":\"Setup\",\"duration\":3,\"plan\":[\"Installing and setting up VSCode, Node.js, Express.js, MongoDB.\",\"Set up Github for version control and commit initial project structure\",\"Create initial project structure\",\"Plan and design database model\"]},{\"title\":\"Implementation\",\"duration\":20,\"plan\":[\"Implement backend routes (CRUD operations for closet items, user profile, outfit suggestions)\",\"Integration of weather API\",\"Implement frontend (user registration, login, view/add/delete closet items, view outfit suggestions)\",\"Connect frontend to backend\"]}]}"
  },
  {
    "role": "user",
    "content": "You can schedule your day with todo items. Todos are ordered and have a duration and importance property;\ntech-stack: HTML, CSS, JavaScript, Next.js, Prisma"
  },
  {
    "role": "assistant",
    "content": "{\"intro\":{\"name\":\"Dynamic Day Scheduler\",\"description\":\"Build a task scheduling application with importance ranking and duration specification\",\"techStack\":[\"HTML\",\"CSS\",\"JavaScript\",\"Next.js\",\"Prisma\"]},\"plan\":[{\"title\":\"Learning\",\"duration\":5,\"plan\":[\"Introduction to HTML, CSS and JavaScript\",\"Understanding of web development fundamentals\",\"Explore JavaScript libraries: React.js\",\"Introduction to Next.js for frontend development\",\"Understanding of Prisma as an ORM for database management\"]},{\"title\":\"Setup\",\"duration\":3,\"plan\":[\"Installing and setting up VSCode, Node.js, Next.js, Prisma.\",\"Set up Github for version control and commit initial project structure\",\"Create initial project structure\",\"Plan and design database model\"]},{\"title\":\"Implementation\",\"duration\":20,\"plan\":[\"Implement backend using Prisma (CRUD operations for the todo items)\",\"Implement frontend with Next.js (user registration, login, view/add/delete/todo items)\",\"Connect frontend to backend\",\"Stylize frontend components with CSS\",\"Ensure that tasks get correctly sorted and displayed by importance and duration\",\"Iteratively test and refine application\"]}]}"
  },
  {
    "role": "user",
    "content": "You can put up an ad for others to rent your car for the weekend or you can view existing ads to book other existing cars."
  },
  {
    "role": "assistant",
    "content": "{\"intro\":{\"name\":\"Weekend Car Rental Marketplace\",\"description\":\"Web app to post/view car rental ads for the weekend\",\"techStack\":[\"HTML\",\"CSS\",\"JavaScript\",\"Node.js\",\"Express.js\",\"MongoDB\"]},\"plan\":[{\"title\":\"Learning\",\"duration\":8,\"plan\":[\"Introduction to HTML, CSS and JavaScript\",\"Understanding of web development fundamentals\",\"Basic Node.js and Express.js for backend server\",\"MongoDB as a NoSQL database\",\"RESTful API principles\",\"User authentication basics\",\"Introduction to multipart/form-data for image uploading\"]},{\"title\":\"Setup\",\"duration\":3,\"plan\":[\"Install and setup your code editor, Node.js, Express.js, MongoDB and Postman\",\"Set up a GitHub Repository for the project\",\"Create basic structure for the backend server\",\"Plan the database models for a User and a Car\"]},{\"title\":\"Backend Implementation\",\"duration\":6,\"plan\":[\"Implement registration and login routes\",\"Implement Car creation, reading, updating and deleting (CRUD) routes\",\"Implement search route to find cars based on specified criteria\",\"Add authorization middleware to protect certain routes\",\"Implement image uploading for Car ads\",\"Testing of all routes via Postman\"]},{\"title\":\"Frontend Implementation - Part 1\",\"duration\":4,\"plan\":[\"Create the HTML skeleton for all the main pages\",\"Implement the navigation bar and footer\",\"Create the registration and login pages\",\"Implement the car listing page and the search feature\"]},{\"title\":\"Frontend Implementation - Part 2\",\"duration\":4,\"plan\":[\"Create a page to view details about a single car\",\"Create forms to add or edit a car ad\",\"Connect your frontend forms to your backend routes\",\"Deploy CSS styling across all pages\"]},{\"title\":\"Finalization\",\"duration\":3,\"plan\":[\"User testing across all routes and views\",\"Debug any issues that arise\",\"Final deployment to a hosting platform like Heroku\",\"User acceptance testing and feedback collection after deployment\"]}]}"
  },
  {
    "role": "user",
    "content": "You can put up an ad for others to rent your spare room or you can rent other people's spare rooms."
  },
  {
    "role": "assistant",
    "content": "{\"intro\":{\"name\":\"Spare Room Rental Marketplace\",\"description\":\"Web app for posting/viewing ads for room rentals\",\"techStack\":[\"HTML\",\"CSS\",\"JavaScript\",\"React.js\",\"Firebase\"]},\"plan\":[{\"title\":\"Learning\",\"duration\":7,\"plan\":[\"Introduction to HTML, CSS and JavaScript\",\"Understanding of web development fundamentals\",\"React.js basics and component-based design\",\"Firebase Firestore for NoSQL database\",\" Authentication and Storage with Firebase\",\"Understanding of cloud functions for backend processes\",\"Introduction to multipart/form-data for image uploading\"]},{\"title\":\"Setup\",\"duration\":3,\"plan\":[\"Install and setup your code editor, Node, React and Firebase CLI\",\"Set up a GitHub Repository for the project\",\"Initialise create-react-app for the frontend\",\"Plan the document structure for Firestore\"]},{\"title\":\"Backend Implementation\",\"duration\":6,\"plan\":[\"Set up Firebase Firestore and Authentication\",\"Implement registration and login functionality\",\"Implement room ad creation, reading, updating and deleting (CRUD) in Firestore\",\"Add cloud functions to protect certain CRUD actions\",\"Implement image uploading to Firebase Storage\",\"Testing of all functionality via own React app\"]},{\"title\":\"Frontend Implementation - Part 1\",\"duration\":5,\"plan\":[\"Create the component structure for all the main pages\",\"Implement the navigation bar and footer\",\"Create the registration and login components\",\"Implement the room listing component\"]},{\"title\":\"Frontend Implementation - Part 2\",\"duration\":5,\"plan\":[\"Create a component to view single room details\",\"Create components to add and edit a room ad\",\"Connect frontend components to Firebase functionality\",\"Deploy CSS styling across all components\"]},{\"title\":\"Finalisation\",\"duration\":2,\"plan\":[\"Testing of all components and functionality\",\"Debug any issues that arise\",\"Final deployment to Firebase Hosting\",\"User acceptance testing and feedback collection after deployment\"]}]}"
  }
];

export class DevScribeAIProjectPlanner extends DevScribeAI {

  constructor(options?: Partial<ChatCompletionCreateParamsBase>) {
    super(context, {
      model: 'gpt-3.5-turbo',
      ...options
    });
  }

  async prompt(messages: PromptMessage[], callbacks?: OpenAIStreamCallbacks, technologies?: string[], userId?: string | null) {
    return await super.prompt(messages, {
      onFinal(completion) {
        // save results to database
        if (!technologies || !userId) throw new Error("Missing technologies or userId");

        CourseService.newCourse(completion, messages[messages.length - 1].content, new Types.ObjectId(userId));
      }
    });
  }
}