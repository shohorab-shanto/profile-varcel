'use client';

import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, Star, GitFork, Eye, Trophy } from 'lucide-react';
import { Profile } from '@/lib/types';

export default function GithubStats({ profile }: { profile: Profile | null }) {
  const githubUsername = profile?.github_url?.split('/').pop() || 'shohorab-shanto';

  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">Open Source</h2>
            <h3 className="text-4xl font-bold">GitHub <span className="text-gradient">Activity</span></h3>
          </div>
          <a 
            href={profile?.github_url || `https://github.com/${githubUsername}`} 
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 glass rounded-full font-bold text-sm hover:bg-white/10 transition-all"
          >
            <Github size={18} /> Follow on GitHub
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="w-full overflow-x-auto flex justify-center">
              <GitHubCalendar 
                username={githubUsername} 
                colorScheme="dark"
                fontSize={12}
                blockSize={12}
                blockMargin={4}
              />
            </div>
            <p className="mt-6 text-sm text-foreground/40 font-medium">My coding contributions over the past year</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Total Stars', value: '120+', icon: <Star className="text-yellow-500" /> },
              { label: 'Repositories', value: '45', icon: <GitFork className="text-blue-500" /> },
              { label: 'Contributions', value: '850+', icon: <Trophy className="text-emerald-500" /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-3xl flex items-center gap-6"
              >
                <div className="p-4 rounded-2xl bg-white/5">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-foreground/40 font-bold uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
