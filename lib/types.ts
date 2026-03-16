export interface Project {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  tech: string[];
  year: string;
  status: 'completed' | 'active' | 'archived';
  github: string;
  live: string | null;
  image: string;
  featured: boolean;
}

export interface SkillsData {
  languages: string[];
  frontend: string[];
  backend: string[];
  tools: string[];
  other: string[];
}
