import projectData from './projects.json';

export type Project = {
  id: string;
  number: string;
  name: string;
  category: 'Web & product' | 'AI & automation';
  label: string;
  description: string;
  tags: string[];
  repo: string;
  live?: string;
  role: string;
  status: string;
  overview: string;
  contributions: string[];
  note: string;
};

export const projects = projectData as Project[];
