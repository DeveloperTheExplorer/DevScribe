import techMappingJson from '$lib/static/tech-mapping.json';

const techMapping: Record<string, string> = techMappingJson;

export const extractTechnologiesFromText = (text: string) => {
  text = text.toLowerCase();

  return Object.keys(techMapping).filter(tech => text.includes(tech));
}