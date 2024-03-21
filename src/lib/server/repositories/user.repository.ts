import { em } from '../db';

import { User } from '../models/user.model';

class UserRepository {
	async getCourses(userId: string) {
		const qb = em.createQueryBuilder(User, 'user');

		return await qb
			.select('*')
			.where({ 'user.id': userId })
			.leftJoinAndSelect('user.courses', 'courses')
			.leftJoinAndSelect('courses.chapters', 'chapters')
			.leftJoinAndSelect('chapters.lessons', 'lessons');
	}
}

const userRepository = new UserRepository();
export { userRepository as UserRepository };
