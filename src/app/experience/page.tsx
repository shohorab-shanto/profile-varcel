import { apiService } from "@/lib/api";
import { Experience, Education, Profile } from "@/lib/types";
import { GraduationCap, Calendar, Trophy, Star, Target } from "lucide-react";
import Footer from "@/components/layout/Footer";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import CredlyBadge from "@/components/experience/CredlyBadge";

async function getData() {
  try {
    const [experience, education, profile] = await Promise.all([
      apiService.getExperience(),
      apiService.getEducation(),
      apiService.getProfile().catch(() => null),
    ]);
    return { experience, education, profile };
  } catch (error) {
    console.error("Failed to fetch experience and education:", error);
    return { experience: [], education: [], profile: null };
  }
}

export default async function ExperiencePage() {
  const { experience, education, profile } = await getData();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">The Journey</h2>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-8 tracking-tight">Experience & <span className="text-gradient">Growth</span></h1>
          <p className="text-lg text-foreground/60">A chronological overview of my professional career, technical achievements, and academic background.</p>
        </div>

        {/* Professional Experience Section */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-16 justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
              <Target size={24} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight uppercase tracking-[0.2em]">Work History</h2>
          </div>
          
          {experience.length > 0 ? (
            <ExperienceTimeline experience={experience} />
          ) : (
            <div className="py-20 glass rounded-[2rem] text-center text-foreground/40 border-dashed">
              <p>Work history is being updated.</p>
            </div>
          )}
        </div>

        {/* Academic & Achievements Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight uppercase tracking-[0.2em]">Education</h2>
            </div>

            <div className="space-y-8">
              {education.map((edu: Education) => (
                <div key={edu.id} className="glass-card p-8 rounded-[2rem] hover:bg-white/[0.02] transition-all group">
                  <div className="flex items-center gap-2 text-blue-500 text-xs font-bold uppercase tracking-widest mb-4">
                    <Calendar size={14} />
                    <span>{edu.year}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">{edu.degree}</h3>
                  <p className="text-foreground/60 font-medium">{edu.institute}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications or Skills Summary */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-500">
                <Trophy size={24} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight uppercase tracking-[0.2em]">Milestones</h2>
            </div>

            <div className="glass-card p-10 rounded-[2rem] space-y-8">
              {[
                { title: 'AWS Certified Solutions Architect – Associate', desc: 'Amazon Web Services (AWS) certified professional with expertise in cloud architecture and deployment.', link: 'https://www.credly.com/earner/earned/share/3a39b500-354b-46c8-887b-e3a88b50c6e0' },
                { title: '5+ Years Experience', desc: 'Extensive experience in backend and full-stack development with Laravel, Next.js, Python, and modern cloud architectures.' },
                { title: 'AI & SaaS Specialist', desc: 'Built multiple AI-powered systems and SaaS platforms serving thousands of users with scalable architectures.' },
              ].map((m, i) => (
                <div key={i} className="flex gap-6">
                  <div className="mt-1">
                    <Star size={20} className="text-yellow-500 fill-yellow-500/20" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">{m.title}</h4>
                    <p className="text-sm text-foreground/60 leading-relaxed">{m.desc}</p>
                    {m.link && (
                      <a href={m.link} target="_blank" className="text-xs text-blue-500 hover:underline mt-1 inline-block">View Credential →</a>
                    )}
                  </div>
                </div>
              ))}
              
              {/* AWS Certification Badge */}
              <div className="pt-8 border-t border-white/5">
                <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-foreground/40">Certification Badge</h4>
                <div className="flex justify-center">
                  <CredlyBadge />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
