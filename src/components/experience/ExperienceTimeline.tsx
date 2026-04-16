'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';
import { Experience } from '@/lib/types';
import { useRef } from 'react';

export default function ExperienceTimeline({ experience }: { experience: Experience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Sort experiences: Current (no end_date, 'Present', or 'Continue') first, then by start_date descending
  const sortedExperience = [...experience].sort((a, b) => {
    // Current roles first
    const isACurrent = !a.end_date || a.end_date.toLowerCase() === 'present' || a.end_date.toLowerCase() === 'continue';
    const isBCurrent = !b.end_date || b.end_date.toLowerCase() === 'present' || b.end_date.toLowerCase() === 'continue';

    if (isACurrent && !isBCurrent) return -1;
    if (!isACurrent && isBCurrent) return 1;

    // Helper to parse "MM/YYYY" or "YYYY" or ISO strings
    const parseDate = (dateStr: string) => {
      if (!dateStr) return 0;
      if (dateStr.includes('/')) {
        const [month, year] = dateStr.split('/');
        return new Date(parseInt(year), parseInt(month) - 1).getTime();
      }
      return new Date(dateStr).getTime() || 0;
    };

    const dateA = parseDate(a.start_date);
    const dateB = parseDate(b.start_date);
    
    return dateB - dateA;
  });

  return (
    <div ref={containerRef} className="relative space-y-12">
      {/* Vertical Line */}
      <div className="absolute left-[17px] sm:left-1/2 top-0 bottom-0 w-0.5 bg-white/5 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 right-0 bg-blue-500 origin-top"
          style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        />
      </div>

      {sortedExperience.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
            index % 2 === 0 ? 'sm:flex-row-reverse' : ''
          }`}
        >
          {/* Connector Dot */}
          <div className="absolute left-[10px] sm:left-1/2 top-2 sm:top-auto w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 -translate-x-1/2" />

          {/* Content Card */}
          <div className="w-full sm:w-[calc(50%-2rem)] ml-10 sm:ml-0">
            <div className="glass-card p-8 rounded-[2rem] hover:bg-white/[0.02] group transition-all">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
                  {exp.company}
                </span>
                <div className="flex items-center gap-2 text-foreground/40 text-xs font-medium">
                  <Calendar size={14} />
                  <span className={(!exp.end_date || exp.end_date.toLowerCase() === 'present' || exp.end_date.toLowerCase() === 'continue') ? 'text-blue-400 font-bold' : ''}>
                    {exp.start_date} - {exp.end_date || 'Present'}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-500 transition-colors">{exp.role}</h3>
              
              <p className="text-foreground/60 text-sm leading-relaxed mb-6">
                {exp.description}
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-foreground/40 text-xs">
                  <Building2 size={14} />
                  <span>Professional</span>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer for large screens */}
          <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
        </motion.div>
      ))}
    </div>
  );
}
