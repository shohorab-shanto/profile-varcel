export interface ProjectImage {
  id: number;
  project_id: number;
  image_path: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_link?: string;
  live_link?: string;
  image?: string;
  image_url?: string;
  featured: boolean;
  images?: ProjectImage[];
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: number;
  name: string;
  title?: string;
  bio?: string;
  email?: string;
  location?: string;
  profile_photo?: string;
  profile_photo_url?: string;
  cv_file?: string;
  cv_file_url?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  footer_text?: string;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'ai' | 'database' | 'programming';
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  description: string;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: number;
  institute: string;
  degree: string;
  year: string;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: number;
  hero_title?: string;
  hero_subtitle?: string;
  hero_description?: string;
  resume_button_text: string;
  contact_button_text: string;
  created_at: string;
  updated_at: string;
}
