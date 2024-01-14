import crypto from 'crypto';

export enum HashType {
  HASH = 'hash',
  OBJECT_ID = 'objectId',
  UNKNOWN = 'unknown'
}

/**
 * Hashes a string value using sha256 and returns the base64 encoded hash
 * @param value any string value
 * @returns a base64 encoded sha256 hash of the value
 */
export const hashValue = (value: string) => {
  return crypto.createHash('sha256').update(value).digest('hex');
}

/**
 * Generates a random hex string of length len
 * @param len length of the random hex string to generate
 * @returns a random hex string of length len
 */
export const randomHash = (len = 5) => {
  return crypto.randomBytes(len).toString('hex');
}

/**
 * Checks if a string value is a valid hex string
 * @param value any string value
 */
export const isHexStr = (value: string) => {
  return /^[0-9A-F]+$/i.test(value);
}

/**
 * Checks if a string value is a valid sha256 base64 hash
 * @param value any string value
 */
const isHash = (value: string) => {
  return value.length === 64 && isHexStr(value);
}

/**
 * Checks if a string value is a valid MongoDB ObjectId
 * @param value any string value
 */
export const isObjectId = (value: string) => {
  return value.length === 24 && isHexStr(value);
}

/**
 * Determines the hash type of a string value
 * 
 * @param value any string value
 */
export const determineHashType = (value: string): HashType => {
  if (isHash(value)) {
    return HashType.HASH;
  } else if (isObjectId(value)) {
    return HashType.OBJECT_ID;
  } else {
    return HashType.UNKNOWN;
  }
}