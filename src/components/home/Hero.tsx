'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Profile, SiteSetting } from '@/lib/types';
import { useState, useEffect, useMemo } from 'react';

export default function Hero({ profile, settings }: { profile: Profile | null, settings: SiteSetting | null }) {
  const words = useMemo(() => {
    if (settings?.hero_subtitle) {
      return settings.hero_subtitle.split(',').map(s => s.trim());
    }
    return ["Full-Stack Developer", "AI Enthusiast", "SaaS Builder", "Clean Code Advocate"];
  }, [settings?.hero_subtitle]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const typingSpeed = isDeleting ? 50 : 100;
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        if (displayedText.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex, words]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-blue-500/20 shadow-2xl shadow-blue-500/20">
              <Image
                src="/me.jpg"
                alt={profile?.name || 'Profile'}
                fill
                className="object-cover object-[center_25%]"
                priority
              />
            </div>
            {/* Online Badge */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-background rounded-full" />
          </motion.div>

          {/* Intro Text */}
          <div className="space-y-4 max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-blue-500 font-semibold tracking-widest uppercase text-sm"
            >
              Available for new projects
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-7xl font-extrabold tracking-tight"
            >
              {settings?.hero_title ? (
                <span dangerouslySetInnerHTML={{ __html: settings.hero_title.replace('[name]', `<span class="text-gradient">${profile?.name || 'Shohorab Ahmed'}</span>`) }} />
              ) : (
                <>Hi, I'm <span className="text-gradient">{profile?.name || 'Shohorab Ahmed'}</span></>
              )}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl sm:text-4xl font-medium text-foreground/80 h-12"
            >
              <span>{displayedText}</span>
              <span className="animate-pulse text-blue-500">|</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed"
            >
              {settings?.hero_description || profile?.bio?.split('\n\n')[0] || 'A Senior Full-Stack Developer dedicated to creating modern, performant, and scalable digital solutions.'}
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="group flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
            >
              View Projects <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="/documents/cv.pdf"
              download="Shohorab_Ahmed_CV.pdf"
              className="flex items-center gap-2 px-8 py-4 glass rounded-full font-bold hover:bg-white/10 transition-all active:scale-95"
            >
              {settings?.resume_button_text || 'Download CV'} <Download size={20} />
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 border border-foreground/10 rounded-full font-bold hover:bg-foreground/5 transition-all active:scale-95"
            >
              {settings?.contact_button_text || 'Contact Me'} <Mail size={20} />
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-6 pt-4"
          >
            {profile?.github_url && (
              <Link href={profile.github_url} target="_blank" className="text-foreground/40 hover:text-blue-500 transition-colors">
                <Github size={24} />
              </Link>
            )}
            {profile?.linkedin_url && (
              <Link href={profile.linkedin_url} target="_blank" className="text-foreground/40 hover:text-blue-500 transition-colors">
                <Linkedin size={24} />
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-500/5 rounded-full" />
      </div>
    </section>
  );
}
