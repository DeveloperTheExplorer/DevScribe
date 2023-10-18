
/**
 * @description List enum values
 * @param enm Enum to list
 */
export const enumValues = (enm: Record<string, unknown>): string[] => {
  const values = [] as string[];
  for (const key in enm) {
    values.push(enm[key] as string);
  }
  return values;
};
