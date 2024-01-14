import { randomHash } from "./hash.util";

export const slugify = (text: string) => {
  const pureSlug = text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  return pureSlug + '-' + randomHash();
}