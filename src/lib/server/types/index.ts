
export interface RawPlan {
  title: string;
  duration: number;
  plan: string[];
}

export interface RawCourse {
  intro: {
    name: string;
    description: string;
    techStack: string[];
  };
  plan: RawPlan[];
}