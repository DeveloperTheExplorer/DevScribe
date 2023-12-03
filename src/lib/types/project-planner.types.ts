
export interface ProjectPlanObject {
  intro: {
    name: string;
    description: string;
    techStack: string[];
  };
  plan: ProjectPlanChapter[];
}

export interface ProjectPlanChapter {
  title: string;
  duration: number;
  plan: string[];
}