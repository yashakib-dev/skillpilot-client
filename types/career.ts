export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Career {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  category: string;
  skills: string[];
  avgSalary: string;
  timeToLearn: string;
  coverImage: string; // Unsplash URL
  icon?: string;
}
