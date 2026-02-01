export interface Experience {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  code: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  link?: string;
}

export interface Section {
  id: string;
  label: string;
}
