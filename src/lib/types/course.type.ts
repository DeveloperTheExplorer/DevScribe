export type { ILesson } from '$app/server/models/lesson.model';

export enum LessonStatus {
	NOT_STARTED = 'NOT_STARTED',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED'
}
