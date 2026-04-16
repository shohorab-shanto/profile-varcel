'use client';

import { motion } from 'framer-motion';
import { Database, Globe, Layout, Layers, Cpu, ShieldCheck, Container, Box, Bot, Code, HardDrive, Terminal } from 'lucide-react';
import { Skill } from '@/lib/types';

const categoryIcons: Record<string, { icon: any, color: string }> = {
  frontend: { icon: <Globe className="text-blue-400" />, color: 'blue' },
  backend: { icon: <Database className="text-emerald-500" />, color: 'emerald' },
  devops: { icon: <Container className="text-orange-500" />, color: 'orange' },
  ai: { icon: <Bot className="text-purple-500" />, color: 'purple' },
  database: { icon: <HardDrive className="text-cyan-500" />, color: 'cyan' },
  programming: { icon: <Terminal className="text-pink-500" />, color: 'pink' },
  default: { icon: <Code className="text-slate-400" />, color: 'slate' }
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function TechStack({ skills }: { skills: Skill[] }) {
  if (!skills || skills.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Technical <span className="text-gradient">Arsenal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 max-w-2xl mx-auto"
          >
            A curated selection of technologies I use to bring complex digital ideas to life.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {skills.map((skill) => {
            const config = categoryIcons[skill.category] || categoryIcons.default;
            return (
              <motion.div
                key={skill.id}
                variants={item}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 rounded-3xl flex flex-col items-center justify-center space-y-4 text-center group"
              >
                <div className={`p-4 rounded-2xl bg-white/5 group-hover:bg-${config.color}-500/10 transition-colors duration-500`}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base">{skill.name}</h3>
                  <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-semibold">{skill.category}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
