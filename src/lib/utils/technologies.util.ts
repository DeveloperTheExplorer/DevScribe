import techMappingJson from '$lib/static/tech-mapping.json';

export const techMapping: Record<string, string> = techMappingJson;
export const allTechCount = Object.keys(techMapping).length;

export const extractTechnologiesFromText = (text: string) => {
  text = text.toLowerCase();

  return Object.keys(techMapping).filter(tech => {
    const regexExp = new RegExp(`\\b${tech}\\b`, "i");
    return text.match(regexExp);
  });
}

export const searchTechnologies = (search: string) => {

  const results = Object.keys(techMapping).filter(tech => {
    return tech.toLowerCase().includes(search.toLowerCase());
  }).map(tech => [techMapping[tech], tech]);
  const filteredResultsObj = Object.fromEntries(results);

  return Object.values(filteredResultsObj) as string[];
}

export const getTechnologyIconUrl = (technology: string) =>
  `/icons/file_type_${techMapping[technology.toLowerCase()] || 'config'}.svg`;