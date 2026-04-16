import { apiService } from "@/lib/api";
import { Project } from "@/lib/types";
import { ArrowLeft, Github, ExternalLink, Calendar, Code2, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  let project: Project | null = null;

  try {
    project = await apiService.getProject(parseInt(id));
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return notFound();
  }

  if (!project) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Visuals */}
          <div className="space-y-8">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl">
              {project.image_url ? (
                <Image 
                  src={project.image_url} 
                  alt={project.title} 
                  fill 
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                  <Layers size={64} className="text-slate-800" />
                </div>
              )}
            </div>

            {/* Gallery Grid */}
            {project.images && project.images.length > 0 && (
              <div className="grid grid-cols-2 gap-6">
                {project.images.map((img) => (
                  <div key={img.id} className="relative aspect-video rounded-3xl overflow-hidden border border-slate-800 group cursor-pointer">
                    <Image 
                      src={img.image_url} 
                      alt="Project gallery" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Content */}
          <div className="space-y-10">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tech_stack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-[2rem] border-slate-800/50 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <Code2 className="text-blue-500" /> Project Overview
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg whitespace-pre-wrap">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.github_link && (
                <a 
                  href={project.github_link} 
                  target="_blank" 
                  className="flex items-center justify-center gap-3 py-5 bg-slate-900 border border-slate-800 rounded-2xl font-bold hover:bg-slate-800 transition-all group"
                >
                  <Github size={20} /> View Source Code
                </a>
              )}
              {project.live_link && (
                <a 
                  href={project.live_link} 
                  target="_blank" 
                  className="flex items-center justify-center gap-3 py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                >
                  <ExternalLink size={20} /> Live Preview
                </a>
              )}
            </div>

            <div className="pt-8 border-t border-slate-800/50 flex items-center gap-8 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>Published: {new Date(project.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
