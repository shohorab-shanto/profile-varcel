'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative glass-card rounded-[2rem] overflow-hidden flex flex-col h-full"
    >
      {/* Project Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-800/50 flex items-center justify-center text-slate-600">
            <ArrowUpRight size={64} className="opacity-20 group-hover:scale-110 transition-transform duration-700" />
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Action Buttons (Floating) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          {project.github_link && (
            <Link 
              href={project.github_link} 
              target="_blank" 
              className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-blue-600 transition-colors"
            >
              <Github size={20} />
            </Link>
          )}
          {project.live_link && (
            <Link 
              href={project.live_link} 
              target="_blank" 
              className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-blue-600 transition-colors"
            >
              <ExternalLink size={20} />
            </Link>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech_stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
              >
                {tech}
              </span>
            ))}
            {project.tech_stack.length > 3 && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-slate-500/10 text-slate-400 rounded-full border border-slate-500/20">
                +{project.tech_stack.length - 3}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-foreground group-hover:text-blue-500 transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        <p className="text-foreground/60 mb-8 text-sm line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <Link 
            href={`/projects/${project.id}`} 
            className="text-sm font-bold uppercase tracking-widest text-foreground/40 hover:text-blue-500 transition-colors flex items-center gap-2 group/link"
          >
            Details <ArrowUpRight size={16} className="group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform" />
          </Link>
          
          <div className="flex -space-x-3">
            {project.images?.slice(0, 3).map((img, i) => (
              <div key={img.id} className="relative w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800">
                <Image src={img.image_url} alt="Project detail" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
