import Hero from "@/components/home/Hero";
import TechStack from "@/components/home/TechStack";
import ProjectCard from "@/components/projects/ProjectCard";
import GithubStats from "@/components/home/GithubStats";
import { apiService } from "@/lib/api";
import { Project, Profile, SiteSetting, Skill } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

async function getFeaturedProjects() {
  try {
    const projects = await apiService.getProjects();
    return projects.filter(p => p.featured).slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch featured projects:", error);
    return [];
  }
}

async function getProfile() {
  try {
    return await apiService.getProfile();
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}

async function getSiteSettings() {
  try {
    return await apiService.getSiteSettings();
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return null;
  }
}

async function getSkills() {
  try {
    return await apiService.getSkills();
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return [];
  }
}

export default async function Home() {
  const [featuredProjects, profile, siteSettings, skills] = await Promise.all([
    getFeaturedProjects(),
    getProfile(),
    getSiteSettings(),
    getSkills()
  ]);

  return (
    <>
      <div className="flex flex-col gap-12 pb-20">
        <Hero profile={profile} settings={siteSettings} />
        
        <TechStack skills={skills} />

        {/* Featured Projects Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">Selected Work</h2>
              <h3 className="text-4xl sm:text-5xl font-bold text-foreground">Featured <span className="text-gradient">Projects</span></h3>
              <p className="mt-6 text-foreground/60 text-lg">A showcase of my recent work, blending technical expertise with creative problem-solving.</p>
            </div>
            <Link 
              href="/projects" 
              className="flex items-center gap-2 px-6 py-3 glass rounded-full font-bold text-sm hover:bg-white/10 transition-all group"
            >
              Explore all work <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-full py-24 glass rounded-[2rem] text-center text-foreground/40 border-dashed">
                <p>Projects are being polished. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        <GithubStats profile={profile} />

        {/* Core Expertise Rebuilt */}
        <section className="py-24 border-t border-white/5 bg-blue-600/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">Specialization</h2>
            <h3 className="text-4xl font-bold mb-16">Core <span className="text-gradient">Expertise</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Frontend', desc: 'Crafting pixel-perfect, performant user interfaces with Next.js and React.', color: 'blue' },
                { title: 'Backend', desc: 'Building robust, scalable architectures with Laravel and Node.js.', color: 'emerald' },
                { title: 'DevOps', desc: 'Streamlining deployment and infrastructure with Docker and AWS.', color: 'orange' },
                { title: 'AI', desc: 'Integrating intelligent AI agents and LLM-powered solutions.', color: 'purple' },
              ].map((item) => (
                <div key={item.title} className="p-10 rounded-[2.5rem] glass-card text-left space-y-4 hover:bg-white/[0.02]">
                  <div className={`w-12 h-1 bg-${item.color}-500 rounded-full mb-6`} />
                  <h4 className="text-2xl font-bold">{item.title}</h4>
                  <p className="text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
