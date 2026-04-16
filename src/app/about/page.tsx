'use client';

import { motion } from "framer-motion";
import { apiService } from "@/lib/api";
import { Skill, Profile } from "@/lib/types";
import { Code, Terminal, Globe, Cpu, MapPin, Download, Mail, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsData, profileData] = await Promise.all([
          apiService.getSkills(),
          apiService.getProfile()
        ]);
        setSkills(skillsData);
        setProfile(profileData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const categorizedSkills = {
    frontend: skills.filter(s => s.category === 'frontend'),
    backend: skills.filter(s => s.category === 'backend'),
    devops: skills.filter(s => s.category === 'devops'),
    ai: skills.filter(s => s.category === 'ai'),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-slate-950">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Info & Bio */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <h2 className="text-blue-500 font-mono font-medium tracking-widest uppercase mb-4">About Me</h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              Designing & Building <span className="text-gradient">Digital Excellence</span>
            </h1>
            
            <div className="prose prose-lg prose-invert max-w-none text-slate-400 space-y-6">
              {profile?.bio ? (
                profile.bio.split('\n\n').map((para, index) => (
                  <p key={index} className="leading-relaxed">
                    {para}
                  </p>
                ))
              ) : (
                <p className="leading-relaxed">
                  I am a Senior Full-Stack Developer with a passion for building robust and scalable digital products. 
                  With expertise spanning both frontend and backend technologies, I bridge the gap between 
                  complex business requirements and elegant technical solutions.
                </p>
              )}
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-blue-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-mono">Based in</p>
                  <p className="font-medium">{profile?.location || 'Dhaka, Bangladesh'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-purple-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-mono">Email</p>
                  <p className="font-medium">{profile?.email || 'shohorab@example.com'}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              {profile?.cv_file_url && (
                <a 
                  href={profile.cv_file_url}
                  target="_blank"
                  className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-bold flex items-center gap-2 hover:bg-slate-200 transition-all active:scale-95"
                >
                  <Download size={20} /> Download CV
                </a>
              )}
              <a 
                href="/contact"
                className="px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold border border-slate-800 flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>

          {/* Right Column: Skills Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Code className="text-blue-500" /> Technical Arsenal
            </h3>

            <div className="grid gap-4">
              {/* Frontend Card */}
              <div className="glass-card p-6 rounded-2xl group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <Globe size={24} />
                  </div>
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-sm">Frontend</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categorizedSkills.frontend.map(skill => (
                    <span key={skill.id} className="px-3 py-1.5 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-400 group-hover:border-blue-500/30 transition-colors">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Card */}
              <div className="glass-card p-6 rounded-2xl group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <Terminal size={24} />
                  </div>
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-sm">Backend</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categorizedSkills.backend.map(skill => (
                    <span key={skill.id} className="px-3 py-1.5 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-400 group-hover:border-emerald-500/30 transition-colors">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI & Data Card */}
              <div className="glass-card p-6 rounded-2xl group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                    <Cpu size={24} />
                  </div>
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-sm">AI & Innovation</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categorizedSkills.ai.map(skill => (
                    <span key={skill.id} className="px-3 py-1.5 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-400 group-hover:border-purple-500/30 transition-colors">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* DevOps Card */}
              <div className="glass-card p-6 rounded-2xl group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <Code size={24} />
                  </div>
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-sm">Infrastructure</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categorizedSkills.devops.map(skill => (
                    <span key={skill.id} className="px-3 py-1.5 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-400 group-hover:border-orange-500/30 transition-colors">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

