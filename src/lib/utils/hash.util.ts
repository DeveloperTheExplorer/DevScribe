import crypto from 'crypto';

export enum HashType {
	HASH = 'hash',
	OBJECT_ID = 'objectId',
	UUID = 'uuid',
	UNKNOWN = 'unknown'
}

/**
 * Hashes a string value using sha256 and returns the base64 encoded hash
 * @param value any string value
 * @returns a base64 encoded sha256 hash of the value
 */
export const hashValue = (value: string) => {
	return crypto.createHash('sha256').update(value).digest('hex');
};

/**
 * Generates a random UUID
 * @returns a random UUID
 */
export const generateUUID = () => {
	return crypto.randomUUID();
};

/**
 * Generates a random hex string of length len
 * @param len length of the random hex string to generate
 * @returns a random hex string of length len
 */
export const randomHash = (len = 5) => {
	return crypto.randomBytes(len).toString('hex');
};

/**
 * Checks if a string value is a valid hex string
 * @param value any string value
 */
export const isHexStr = (value: string) => {
	return /^[0-9A-F]+$/i.test(value);
};

/**
 * Checks if a string value is a valid sha256 base64 hash
 * @param value any string value
 */
const isHash = (value: string) => {
	return value.length === 64 && isHexStr(value);
};

/**
 * Checks if a string value is a valid MongoDB ObjectId
 * @param value any string value
 */
export const isObjectId = (value: string) => {
	return value.length === 24 && isHexStr(value);
};

/**
 * Checks if a string value is a valid UUID
 * @param value any string value
 */
export const isUUID = (value: string) => {
	const uuidRegex = new RegExp(
		'^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
		'i'
	);
	return uuidRegex.test(value);
};

/**
 * Determines the hash type of a string value
 *
 * @param value any string value
 */
export const determineHashType = (value: string): HashType => {
	switch (true) {
		case isHash(value):
			return HashType.HASH;
		case isObjectId(value):
			return HashType.OBJECT_ID;
		case isUUID(value):
			return HashType.UUID;
		default:
			return HashType.UNKNOWN;
	}
};
