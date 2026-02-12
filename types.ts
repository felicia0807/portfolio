
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  feedback: 'positive' | 'negative' | null;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  links: {
    github?: string;
    live?: string;
  };
}

export interface Skill {
  category: string;
  items: string[];
}

export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  location: string;
  email: string;
  skills: Skill[];
  projects: Project[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
}
