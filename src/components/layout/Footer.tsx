import { Github, Linkedin, Mail, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Profile } from '@/lib/types';

export default function Footer({ profile }: { profile: Profile | null }) {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {profile?.name || 'Shohorab Ahmed'}
            </Link>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-md line-clamp-3">
              {profile?.bio || 'Senior Full-Stack Developer specializing in building modern web applications with React, Next.js, and Laravel.'}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6 md:justify-end items-center">
            {profile?.github_url && (
              <Link href={profile.github_url} target="_blank" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Github size={24} />
              </Link>
            )}
            {profile?.linkedin_url && (
              <Link href={profile.linkedin_url} target="_blank" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Linkedin size={24} />
              </Link>
            )}
            {profile?.twitter_url && (
              <Link href={profile.twitter_url} target="_blank" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Twitter size={24} />
              </Link>
            )}
            {profile?.facebook_url && (
              <Link href={profile.facebook_url} target="_blank" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Facebook size={24} />
              </Link>
            )}
            {profile?.instagram_url && (
              <Link href={profile.instagram_url} target="_blank" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Instagram size={24} />
              </Link>
            )}
            {profile?.email && (
              <Link href={`mailto:${profile.email}`} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Mail size={24} />
              </Link>
            )}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {profile?.footer_text || `© ${new Date().getFullYear()} ${profile?.name || 'Shohorab Ahmed'}. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
