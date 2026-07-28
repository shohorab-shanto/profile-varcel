'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Github, Linkedin, Instagram } from 'lucide-react';
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

  const socialLinks = useMemo(() => {
    if (!profile) return [];
    return [
      {
        name: 'GitHub',
        url: profile.github_url,
        icon: <Github size={24} />
      },
      {
        name: 'LinkedIn',
        url: profile.linkedin_url,
        icon: <Linkedin size={24} />
      },
      {
        name: 'X',
        url: profile.twitter_url,
        icon: (
          <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        )
      },
      {
        name: 'Medium',
        url: profile.medium_url,
        icon: (
          <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42zm3.04 0c0 3.24-.31 5.86-.7 5.86s-.7-2.62-.7-5.86.31-5.86.7-5.86.7 2.62.7 5.86z"/>
          </svg>
        )
      },
      {
        name: 'Threads',
        url: profile.threads_url,
        icon: (
          <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.846 14.85c-.947.603-2.072.9-3.376.9-1.854 0-3.27-.582-4.248-1.747-.978-1.165-1.467-2.738-1.467-4.722v-.22c0-1.996.48-3.58 1.442-4.75C9.158 5.283 10.59 4.7 12.483 4.7c1.828 0 3.208.563 4.14 1.688.932 1.125 1.398 2.668 1.398 4.629v1.442c0 .9-.228 1.597-.685 2.09-.457.494-1.042.741-1.753.741-.536 0-1.026-.2-1.468-.6-.44-.4-.73-.918-.868-1.554-.86.993-1.895 1.49-3.107 1.49-.915 0-1.636-.263-2.164-.789-.527-.525-.79-1.202-.79-2.03 0-.853.27-1.547.813-2.083.542-.535 1.29-.803 2.24-.803.957 0 1.766.305 2.428.915V9.44c0-.79-.174-1.39-.523-1.798-.35-.407-.866-.612-1.548-.612-.663 0-1.196.22-1.598.663-.402.44-.602 1.053-.602 1.836h-1.81c0-1.282.39-2.28 1.17-2.993.78-.714 1.835-1.07 3.167-1.07 1.258 0 2.228.347 2.91 1.041.683.694 1.024 1.696 1.024 3.007v3.666c0 .484.116.852.348 1.106.232.253.544.38.936.38.35 0 .633-.127.847-.38.214-.253.32-.619.32-1.097v-1.417c0-1.636-.376-2.92-1.13-3.854-.754-.933-1.854-1.4-3.3-1.4-1.558 0-2.733.486-3.528 1.46-.795.972-1.192 2.336-1.192 4.093v.231c0 1.746.393 3.097 1.178 4.053.785.955 1.94 1.433 3.466 1.433 1.031 0 1.914-.22 2.65-.662.736-.442 1.28-.973 1.63-1.594l1.493 1.023c-.536.903-1.29 1.62-2.26 2.152zM12.4 12.19c-.433 0-.766.117-.998.35-.232.233-.348.547-.348.943 0 .378.113.682.338.913.225.231.55.347.973.347.458 0 .826-.145 1.104-.436.278-.29.417-.674.417-1.15v-.967H12.4z"/>
          </svg>
        )
      },
      {
        name: 'Instagram',
        url: profile.instagram_url,
        icon: <Instagram size={24} />
      }
    ].filter(link => link.url);
  }, [profile]);

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
            className="flex items-center justify-center gap-6 pt-4 flex-wrap"
          >
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url!}
                target="_blank"
                className="text-foreground/40 hover:text-blue-500 transition-colors duration-300"
                aria-label={link.name}
              >
                {link.icon}
              </Link>
            ))}
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
