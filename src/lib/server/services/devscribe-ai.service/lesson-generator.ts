import type { OpenAIStreamCallbacks } from 'ai';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

import { DevScribeAI } from '.';
import type { PromptMessage } from '.';
import { CourseService } from '../course.service';

const context: PromptMessage[] = [
	{
		role: 'system',
		content:
			'Your goal is to mentor a beginner on their journey to learning to become a web software engineer. \n\nTheir goal is to create an application.\n\nYour response must be in markdown format.\n\nBased on what the user wishes to build and the topic at hand, generate a professional markdown article on the topic provided. Provide code samples whenever possible, and explain ideas and concepts in simple terms. Provide examples whenever possible.\n\nInclude specific external links to official documentation for further reading and learning specific topics such as setup, theory, API references, etc.\n\nAt the end of the article external links to official documentation for further reading on the topics discussed in this article.\n\nBy the end of the article, the user should be comfortable with the concepts discussed.'
	},
	{
		role: 'user',
		content:
			'Goal: Web app to generate plans and personalized documentation for any project;\nArticle Topic: Introduction to TypeScript'
	},
	{
		role: 'assistant',
		content:
			'# Introduction to TypeScript\n\nTypeScript is a programming language that is a superset of JavaScript, meaning it adds additional features and functionality to JavaScript. It aims to address the limitations of JavaScript by introducing strong typing and advanced tooling capabilities. TypeScript allows us to write safer and more maintainable code and is widely used in modern web development.\n\n## Getting Started with TypeScript\n\nTo start using TypeScript, you will need to install it on your computer. Here are the steps to get started:\n\n1. Install Node.js: TypeScript requires Node.js to be installed on your computer. You can download and install it from the official website: [https://nodejs.org](https://nodejs.org)\n\n2. Install TypeScript: Once Node.js is installed, open your terminal or command prompt and run the following command to install TypeScript globally on your computer: \n\n```\nnpm install -g typescript\n```\n\n3. Create a new TypeScript file: Now that TypeScript is installed, create a new file with a `.ts` extension, for example, `app.ts`.\n\n4. Write some TypeScript code: Open the `app.ts` file in a text editor or an integrated development environment (IDE) such as Visual Studio Code. TypeScript is similar to JavaScript, so you can start by writing regular JavaScript code. However, you can gradually introduce TypeScript features such as types and interfaces.\n\n```typescript\nfunction greet(name: string) {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet("John");\n```\n\n5. Compile TypeScript code: Before the TypeScript code can be executed, it needs to be transpiled into JavaScript. In the terminal or command prompt, navigate to the folder where the `app.ts` file is located and run the following command:\n\n```\ntsc app.ts\n```\n\nThis will generate a `app.js` file containing the transpiled JavaScript code.\n\n6. Run the JavaScript code: Now that you have the `app.js` file, you can run it using Node.js. In the terminal or command prompt, navigate to the folder with the `app.js` file and run the following command:\n\n```\nnode app.js\n```\n\nYou should see the output "Hello, John!" in the console.\n\nCongratulations! You have successfully written and executed your first TypeScript code.\n\n## Features of TypeScript\n\nTypeScript comes with several features that enhance JavaScript development. Let\'s explore some of these features:\n\n### 1. Static Typing\n\nOne of the main features of TypeScript is static typing. It allows you to specify the types of variables, function parameters, and return values. This enables the compiler to catch potential type errors before the code is executed.\n\n```typescript\nfunction addNumbers(a: number, b: number): number {\n  return a + b;\n}\n\nconst result = addNumbers(5, "10"); // Type error: Argument of type \'"10"\' is not assignable to parameter of type \'number\'\n```\n\nIn the example above, TypeScript would highlight the type error during compilation, preventing the code from executing with incorrect data types.\n\n### 2. Interfaces\n\nInterfaces in TypeScript provide a way to define the structure of an object. They allow you to specify the properties and their respective types that an object should have. This helps enforce consistency and prevent errors when working with complex data structures.\n\n```typescript\ninterface User {\n  name: string;\n  email: string;\n  age?: number;\n}\n\nfunction sendEmail(user: User) {\n  console.log(`Sending email to ${user.email}`);\n}\n\nconst newUser = {\n  name: "John",\n  email: "john@example.com",\n  age: 30,\n};\n\nsendEmail(newUser);\n```\n\nIn the above example, the `User` interface defines the structure of a user object. The `sendEmail` function takes an argument of type `User` and logs the email address. When calling the function, TypeScript validates that the argument conforms to the `User` interface.\n\n### 3. Compile-time Error Checking\n\nTypeScript performs static type checking at compile-time, meaning it catches errors before the code is even executed. This helps to identify and fix potential issues early in the development process, improving the overall stability and maintainability of your codebase.\n\n### 4. Tooling and Editor Support\n\nTypeScript offers excellent tooling and editor support that enhances developer productivity. Most modern code editors, such as Visual Studio Code, have built-in TypeScript integration, providing features like autocompletion, code navigation, and automatic error checking.\n\n## Further Reading\n\nTo dive deeper into TypeScript and learn more about its features, syntax, and best practices, here are some official resources:\n\n- TypeScript Official Website: [https://www.typescriptlang.org](https://www.typescriptlang.org)\n- TypeScript Handbook: [https://www.typescriptlang.org/docs/handbook/intro.html](https://www.typescriptlang.org/docs/handbook/intro.html)\n- TypeScript Playground: [https://www.typescriptlang.org/play](https://www.typescriptlang.org/play)\n\nTake your time and explore these resources to gain a solid foundation in TypeScript. Practice writing TypeScript code, experiment with different features, and gradually incorporate it into your web application project.\n\nHappy coding!'
	},
	{
		role: 'user',
		content:
			'Goal: Web app to generate plans and personalized documentation for any project;\nArticle Topic: Understanding of web development fundamentals'
	},
	{
		role: 'assistant',
		content:
			"# Understanding Web Development Fundamentals\n\nWeb development is the process of building applications that run on the web, accessible through browsers. It involves a combination of various technologies and concepts that work harmoniously to create powerful and interactive web applications. In this article, we will explore the fundamental concepts of web development.\n\n## Client-Server Architecture\n\nWeb development follows a client-server architecture. The client, usually a web browser, sends requests to the server, which processes those requests and sends back responses. The client and server communicate using HTTP (Hypertext Transfer Protocol).\n\n### HTML, CSS, and JavaScript\n\nHTML (Hypertext Markup Language), CSS (Cascading Style Sheets), and JavaScript are the three core technologies used in web development.\n\n- **HTML** is responsible for structuring the content and defining the elements of a web page. It provides the building blocks of a website, such as headings, paragraphs, links, and images.\n\n- **CSS** is used to style the HTML elements and define their appearance. It allows you to control the layout, colors, fonts, and other visual aspects of a web page.\n\n- **JavaScript** is a programming language that adds interactivity and behavior to web pages. It enables dynamic updates, event handling, form validation, and much more.\n\n### Front-End and Back-End Development\n\nWeb development can be divided into two main categories:\n\n- **Front-End Development**: This involves creating the user-facing side of a website or web application. Front-end developers use HTML, CSS, and JavaScript to build the interface that users interact with. They focus on usability, responsiveness, and creating visually appealing designs.\n\n- **Back-End Development**: This involves building the server-side logic and database interactions of a website or web application. Back-end developers work with various technologies such as server-side programming languages (e.g., Node.js, Python, Ruby), databases (e.g., MySQL, MongoDB), and web servers (e.g., Apache, Nginx).\n\n## Introduction to APIs\n\nAPIs (Application Programming Interfaces) play a crucial role in web development. They allow different applications to communicate and exchange data with each other.\n\n- **Web APIs**: Web APIs are interfaces provided by web servers that allow developers to access and manipulate web resources. For example, the Fetch API allows developers to make HTTP requests from JavaScript code.\n\n- **Third-Party APIs**: Third-party APIs are APIs provided by external services or platforms. They offer functionalities such as accessing payment gateways, social media integration, weather data, and more. Developers can leverage these APIs to enhance their applications' capabilities.\n\n## Version Control with Git\n\nGit is a widely used version control system in web development. It allows developers to track changes to their codebase and collaborate with others. Git provides features like branching, merging, and rollback, ensuring code integrity and enabling efficient teamwork.\n\nVersion control with Git involves creating a repository, committing code changes, branching for new features or bug fixes, merging changes, and pushing/pulling code to/from remote repositories (such as GitHub or GitLab).\n\n## Web Development Frameworks\n\nWeb development frameworks provide pre-built tools, libraries, and templates to streamline the development process. They offer a structured way to organize code and provide solutions for common problems.\n\nFrameworks like React, Angular, and Vue.js are popular in front-end development, while frameworks like Express.js (Node.js) and Django (Python) are commonly used in back-end development. These frameworks help developers save time, improve code quality, and create scalable applications.\n\n## Learning Resources\n\nTo explore web development further, here are some recommended resources:\n\n- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn) - An extensive resource for learning web technologies, covering HTML, CSS, JavaScript, and more.\n\n- [W3Schools](https://www.w3schools.com) - A beginner-friendly website with tutorials and references for HTML, CSS, JavaScript, and other web technologies.\n\n- [FreeCodeCamp](https://www.freecodecamp.org) - A community-driven platform offering free interactive coding challenges and certifications in web development.\n\n- [Full Stack Open](https://fullstackopen.com) - A comprehensive course on full-stack web development provided by the University of Helsinki. It covers HTML, CSS, JavaScript, React, Node.js, and more.\n\nTake your time to explore these resources and work on projects to apply your knowledge. The more you practice, the better you will become at web development.\n\nHappy coding!"
	}
];

const model: ChatCompletionCreateParamsBase['model'] = 'gpt-3.5-turbo-16k';

export class DevScribeAILessonGenerator extends DevScribeAI {
	constructor(options?: Partial<ChatCompletionCreateParamsBase>) {
		super(context, {
			model,
			...options,
			max_tokens: 3000
		});
	}

	async prompt(
		messages: PromptMessage[],
		callbacks: OpenAIStreamCallbacks,
		lessonId: string,
		chapterIndex: number,
		lessonIndex: number
	) {
		if (!lessonId) throw new Error('Missing lessonId');
		return await super.prompt(messages, {
			onCompletion(completion) {
				console.log('completion :>> ', completion);
				// save results to database

				CourseService.addLessonContent(
					lessonId,
					completion,
					messages[messages.length - 1].content,
					model
				);
			},
			...callbacks
		});
	}
}
