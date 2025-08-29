// Core data types for the NextGen-CTO landing page

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  feedback: string;
  avatar: string;
  rating?: number;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  duration?: string;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  steps: RoadmapStep[];
  color: string;
  externalLink?: string;
}

export interface WaitlistForm {
  email: string;
  name?: string;
  interests?: string[];
}