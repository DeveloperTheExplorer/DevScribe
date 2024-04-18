import { PrimaryKey, Property } from '@mikro-orm/mysql';

import { generateUUID } from '$lib/utils/hash.util';

export class BaseModel {
	@PrimaryKey({ type: 'uuid' })
	id = generateUUID();

	@Property()
	createdAt = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt = new Date();
}
