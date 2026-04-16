import { Project, Skill, Profile, Experience, Education, ContactMessage, SiteSetting } from './types';
import { Database, Globe, Layout, Layers, Cpu, ShieldCheck, Container, Box, Bot, Code, HardDrive, Terminal } from 'lucide-react';

// Mock Data from the current backend state
const MOCK_PROFILE: Profile = {
  id: 1,
  name: "SHOHORAB AHMED",
  title: "Senior Software Engineer",
  bio: "Senior Software Engineer with 5+ years of experience in backend and full-stack development. Specialized in building scalable SaaS, eCommerce, and AI-powered systems using modern architectures. Experienced in cloud infrastructure (AWS), containerization (Docker, Kubernetes), and DevOps practices to deliver high-performance, production-ready solutions aligned with business goals.",
  email: "shohorabshanto@gmail.com",
  location: "Mirpur 11, Dhaka, Bangladesh",
  github_url: "https://github.com/shohorab-shanto",
  linkedin_url: "https://www.linkedin.com/in/shohorab-shanto-0aa83521b",
  profile_photo_url: "/me.jpg",
  cv_file_url: "/documents/cv.pdf",
  footer_text: "© 2026 SHOHORAB AHMED. All rights reserved.",
  created_at: "2026-03-14T07:53:17.000000Z",
  updated_at: "2026-03-14T08:40:15.000000Z",
};

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "ZB Design - AI Furniture Rental & Marketplace",
    description: "AI-powered furniture platform for room design, automated pricing, and rental management. Features AI-driven room design, smart furniture recommendations, and a modern eCommerce experience for the Australian market.",
    tech_stack: ["AI", "Next.js", "Laravel", "React", "eCommerce"],
    live_link: "https://zbdezign.com.au/",
    featured: true,
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    images: [],
    created_at: "2026-03-14T07:53:17.000000Z",
    updated_at: "2026-03-14T08:32:08.000000Z",
  },
  {
    id: 2,
    title: "Perfecto BD - Beauty E-commerce",
    description: "Scalable beauty e-commerce platform with Next.js, Node.js, Laravel, and Redis for fast performance. Features modern UI, product management, and seamless shopping experience.",
    tech_stack: ["Next.js", "Node.js", "Laravel", "Redis", "eCommerce"],
    live_link: "https://perfectobd.com",
    featured: true,
    image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    images: [],
    created_at: "2026-03-14T07:53:17.000000Z",
    updated_at: "2026-03-14T08:32:08.000000Z",
  },
  {
    id: 3,
    title: "SepiaBD - Multi-Vendor Marketplace",
    description: "Marketplace supporting digital and physical products with secure delivery, built using Laravel and React. Features vendor management, product listings, and secure transactions.",
    tech_stack: ["Laravel", "React", "Multi-Vendor", "Marketplace"],
    live_link: "https://sepiabd.com",
    featured: true,
    image_url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop",
    images: [],
    created_at: "2026-03-14T07:53:17.000000Z",
    updated_at: "2026-03-14T08:32:08.000000Z",
  },
  {
    id: 4,
    title: "TaskFino - SaaS Platform",
    description: "HRMS and task management system with payroll and accounting, developed in React and Laravel for workflow automation. Features Kanban boards, milestone tracking, and role-based access.",
    tech_stack: ["React", "Laravel", "SaaS", "HRMS", "API"],
    live_link: "https://taskfino.com",
    featured: true,
    image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=800&auto=format&fit=crop",
    images: [],
    created_at: "2026-03-14T07:53:17.000000Z",
    updated_at: "2026-03-14T08:32:08.000000Z",
  },
  {
    id: 5,
    title: "Winvoice - Invoice SaaS",
    description: "Multi-currency invoicing platform with PDF generation, templates, and secure payment integration. Streamlines billing and invoicing workflows for businesses.",
    tech_stack: ["SaaS", "Laravel", "React", "PDF", "Payments"],
    live_link: "https://winvoice.net",
    featured: true,
    image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    images: [],
    created_at: "2026-03-14T07:53:17.000000Z",
    updated_at: "2026-03-14T08:32:08.000000Z",
  },
  {
    id: 6,
    title: "Skyticket (OTA)",
    description: "Enhanced OTA flight booking system with optimized booking, confirmation, and billing modules using PHP and Java microservices. Improved successful bookings by 25%.",
    tech_stack: ["PHP", "Java", "JavaScript", "Microservices"],
    live_link: "https://skyticket.com",
    featured: false,
    image_url: "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=800&auto=format&fit=crop",
    images: [],
    created_at: "2026-03-14T07:53:17.000000Z",
    updated_at: "2026-03-14T07:53:17.000000Z",
  },
  {
    id: 7,
    title: "Context-Based AI Chatbot",
    description: "Intelligent chatbot with context-aware responses built using modern AI frameworks. Features natural language understanding and context retention for better user interactions.",
    tech_stack: ["AI", "Python", "LangChain", "LLM"],
    github_link: "https://github.com/shohorab-shanto/context-based-ai-chatbot",
    featured: false,
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    images: [],
    created_at: "2026-03-14T07:53:17.000000Z",
    updated_at: "2026-03-14T07:53:17.000000Z",
  },
  {
    id: 8,
    title: "AI Travel Planner Agent",
    description: "Multi-agent AI system for end-to-end travel planning using Python, FastAPI, and LangChain. Automates itinerary creation, booking recommendations, and travel optimization.",
    tech_stack: ["AI", "Python", "FastAPI", "LangChain", "Multi-Agent"],
    live_link: "https://colab.research.google.com/drive/1nNbDK1tgjO5NL89TyRzwoUx_d-4Zkavj?usp=sharing",
    featured: false,
    image_url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop",
    images: [],
    created_at: "2026-03-14T07:53:17.000000Z",
    updated_at: "2026-03-14T07:53:17.000000Z",
  },
  {
    id: 9,
    title: "RAG AI Chat System",
    description: "Context-aware chatbot with FastAPI, LangChain, and FAISS for intelligent question answering. Implements Retrieval-Augmented Generation for accurate responses.",
    tech_stack: ["AI", "Python", "FastAPI", "LangChain", "RAG", "FAISS"],
    live_link: "https://colab.research.google.com/drive/11OYiccmpjO5NL89TyRzwoUx_d-4Zkavj?usp=sharing",
    featured: false,
    image_url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
    images: [],
    created_at: "2026-03-14T07:53:17.000000Z",
    updated_at: "2026-03-14T07:53:17.000000Z",
  },
  {
    id: 10,
    title: "ExamBuzz - Online Exam Platform",
    description: "Online exam platform with practice tests, study materials, and performance analytics using Laravel and React. Features automated grading and progress tracking.",
    tech_stack: ["Laravel", "React", "Education", "Analytics"],
    featured: false,
    image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    images: [],
    created_at: "2026-03-14T07:53:17.000000Z",
    updated_at: "2026-03-14T07:53:17.000000Z",
  },
  {
    id: 11,
    title: "IMVS for DPHE - Government Monitoring",
    description: "Centralized monitoring system with GIS/GPS integration, built with Nuxt 3 and Laravel. Digitized 100% of manual workflows for faster decision-making.",
    tech_stack: ["Nuxt 3", "Laravel", "GIS", "GPS", "Government"],
    featured: false,
    image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    images: [],
    created_at: "2026-03-14T07:53:17.000000Z",
    updated_at: "2026-03-14T07:53:17.000000Z",
  }
];

const MOCK_SKILLS: Skill[] = [
  // Backend & APIs
  { id: 1, name: "Laravel", category: "backend", created_at: "", updated_at: "" },
  { id: 2, name: "Node.js", category: "backend", created_at: "", updated_at: "" },
  { id: 3, name: "Express.js", category: "backend", created_at: "", updated_at: "" },
  { id: 4, name: "FastAPI", category: "backend", created_at: "", updated_at: "" },
  { id: 5, name: "REST APIs", category: "backend", created_at: "", updated_at: "" },
  { id: 6, name: "Microservices", category: "backend", created_at: "", updated_at: "" },
  
  // Frontend
  { id: 7, name: "React.js", category: "frontend", created_at: "", updated_at: "" },
  { id: 8, name: "Next.js", category: "frontend", created_at: "", updated_at: "" },
  { id: 9, name: "Vue.js", category: "frontend", created_at: "", updated_at: "" },
  { id: 10, name: "Nuxt.js", category: "frontend", created_at: "", updated_at: "" },
  { id: 11, name: "Tailwind CSS", category: "frontend", created_at: "", updated_at: "" },
  { id: 12, name: "AJAX", category: "frontend", created_at: "", updated_at: "" },
  { id: 13, name: "JSON", category: "frontend", created_at: "", updated_at: "" },
  
  // AI & Automation
  { id: 14, name: "OpenAI", category: "ai", created_at: "", updated_at: "" },
  { id: 15, name: "LangChain", category: "ai", created_at: "", updated_at: "" },
  { id: 16, name: "RAG", category: "ai", created_at: "", updated_at: "" },
  { id: 17, name: "GPT", category: "ai", created_at: "", updated_at: "" },
  { id: 18, name: "HuggingFace", category: "ai", created_at: "", updated_at: "" },
  { id: 19, name: "FAISS", category: "ai", created_at: "", updated_at: "" },
  
  // Database
  { id: 26, name: "MySQL", category: "database", created_at: "", updated_at: "" },
  { id: 27, name: "PostgreSQL", category: "database", created_at: "", updated_at: "" },
  { id: 28, name: "SQLite", category: "database", created_at: "", updated_at: "" },
  
  // DevOps & Cloud
  { id: 20, name: "AWS (EC2, S3)", category: "devops", created_at: "", updated_at: "" },
  { id: 21, name: "Docker", category: "devops", created_at: "", updated_at: "" },
  { id: 22, name: "Kubernetes", category: "devops", created_at: "", updated_at: "" },
  { id: 23, name: "CI/CD", category: "devops", created_at: "", updated_at: "" },
  { id: 24, name: "Git", category: "devops", created_at: "", updated_at: "" },
  { id: 25, name: "Linux", category: "devops", created_at: "", updated_at: "" },
  
  // Programming Languages
  { id: 29, name: "PHP", category: "programming", created_at: "", updated_at: "" },
  { id: 30, name: "JavaScript/TypeScript", category: "programming", created_at: "", updated_at: "" },
  { id: 31, name: "Python", category: "programming", created_at: "", updated_at: "" },
  { id: 32, name: "Java", category: "programming", created_at: "", updated_at: "" },
  { id: 33, name: "C/C++", category: "programming", created_at: "", updated_at: "" },
];

const MOCK_EXPERIENCE: Experience[] = [
  {
    id: 1,
    company: "WizTecBD",
    role: "Senior Software Engineer",
    description: "Led development of scalable enterprise dashboards, improving system performance by 35% and supporting 50k+ users. Integrated monitoring, tracking, and reporting systems, reducing manual reporting time by 60%. Mentored 6 developers, improving code quality and accelerating feature delivery by 30%.",
    start_date: "07/2025",
    end_date: "Continue",
    created_at: "2026-03-14T07:53:19.000000Z",
    updated_at: "2026-03-14T07:53:19.000000Z"
  },
  {
    id: 2,
    company: "Adventure Dhaka Ltd. (Japan-based multinational company)",
    role: "Senior Software Engineer",
    description: "Maintained Skyticket OTA system, optimizing booking modules and increasing successful bookings by 25%. Integrated third-party APIs and scaled backend infrastructure, improving response time by 40%. Contributed to Agile planning and CI/CD pipelines, reducing deployment errors by 50%.",
    start_date: "09/2024",
    end_date: "06/2025",
    created_at: "2026-03-14T07:53:19.000000Z",
    updated_at: "2026-03-14T07:53:19.000000Z"
  },
  {
    id: 3,
    company: "Dream71 Bangladesh Ltd.",
    role: "Senior Software Engineer",
    description: "Developed DPHE government monitoring system with GIS/GPS integration, reducing field reporting time by 60%. Built interactive dashboards, digitizing 100% of manual workflows for faster decision-making.",
    start_date: "06/2023",
    end_date: "08/2024",
    created_at: "2026-03-14T07:53:19.000000Z",
    updated_at: "2026-03-14T07:53:19.000000Z"
  },
  {
    id: 4,
    company: "Viser X",
    role: "Software Developer",
    description: "Built eCommerce and inventory systems supporting 500+ products and 10k+ daily transactions. Implemented multi-level approval workflows for inspections and billing, saving 15 hours/week for operations staff.",
    start_date: "01/2021",
    end_date: "08/2023",
    created_at: "2026-03-14T07:53:19.000000Z",
    updated_at: "2026-03-14T07:53:19.000000Z"
  }
];

const MOCK_EDUCATION: Education[] = [
  {
    id: 1,
    institute: "Bangladesh Army International University of Science and Technology",
    degree: "B.Sc. in Computer Science & Engineering",
    year: "2017 – 2021",
    created_at: "2026-03-14T07:53:19.000000Z",
    updated_at: "2026-03-14T07:53:19.000000Z"
  }
];

const MOCK_SITE_SETTINGS: SiteSetting = {
  id: 1,
  hero_title: "Hi, I'm [name]",
  hero_subtitle: "Senior Software Engineer, AI Specialist, Full-Stack Developer, SaaS Builder",
  hero_description: "Seasoned Software Engineer with extensive expertise in backend and full-stack development. Specialized in architecting scalable SaaS platforms, eCommerce solutions, and AI-powered systems. Proficient in cloud infrastructure (AWS), containerization (Docker, Kubernetes), and DevOps methodologies to deliver robust, production-grade solutions that drive business success.",
  resume_button_text: "Download CV",
  contact_button_text: "Let's Talk",
  created_at: "",
  updated_at: ""
};

export const apiService = {
  // Mock implementations
  getProjects: async () => MOCK_PROJECTS,
  getProject: async (id: number) => MOCK_PROJECTS.find(p => p.id === id) || null,
  getSkills: async () => MOCK_SKILLS,
  getProfile: async () => MOCK_PROFILE,
  getExperience: async () => MOCK_EXPERIENCE,
  getEducation: async () => MOCK_EDUCATION,
  getSiteSettings: async () => MOCK_SITE_SETTINGS,
  getContacts: async () => [],
  
  // Auth mock
  login: async (credentials: any) => ({ token: 'mock-token-for-vercel' }),
  
  // Mutations mock (do nothing for static version)
  updateProfile: async (data: any) => MOCK_PROFILE,
  updateSiteSettings: async (data: any) => MOCK_SITE_SETTINGS,
  createProject: async (data: any) => MOCK_PROJECTS[0],
  updateProject: async (id: number, data: any) => MOCK_PROJECTS[0],
  deleteProject: async (id: number) => ({ success: true }),
  createSkill: async (data: any) => MOCK_SKILLS[0],
  deleteSkill: async (id: number) => ({ success: true }),
  createExperience: async (data: any) => MOCK_EXPERIENCE[0],
  updateExperience: async (id: number, data: any) => MOCK_EXPERIENCE[0],
  deleteExperience: async (id: number) => ({ success: true }),
  createEducation: async (data: any) => MOCK_EDUCATION[0],
  updateEducation: async (id: number, data: any) => MOCK_EDUCATION[0],
  deleteEducation: async (id: number) => ({ success: true }),
  sendMessage: async (data: any) => ({ success: true }),
};
