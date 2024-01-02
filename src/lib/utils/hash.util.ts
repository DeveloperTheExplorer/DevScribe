import crypto from 'crypto';

export const hashValue = (value: string) => {
  return crypto.createHash('md5').update(value).digest('hex');
}