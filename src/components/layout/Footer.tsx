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
              <Link href={profile.twitter_url} target="_blank" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
            )}
            {profile?.medium_url && (
              <Link href={profile.medium_url} target="_blank" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42zm3.04 0c0 3.24-.31 5.86-.7 5.86s-.7-2.62-.7-5.86.31-5.86.7-5.86.7 2.62.7 5.86z"/>
                </svg>
              </Link>
            )}
            {profile?.threads_url && (
              <Link href={profile.threads_url} target="_blank" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.846 14.85c-.947.603-2.072.9-3.376.9-1.854 0-3.27-.582-4.248-1.747-.978-1.165-1.467-2.738-1.467-4.722v-.22c0-1.996.48-3.58 1.442-4.75C9.158 5.283 10.59 4.7 12.483 4.7c1.828 0 3.208.563 4.14 1.688.932 1.125 1.398 2.668 1.398 4.629v1.442c0 .9-.228 1.597-.685 2.09-.457.494-1.042.741-1.753.741-.536 0-1.026-.2-1.468-.6-.44-.4-.73-.918-.868-1.554-.86.993-1.895 1.49-3.107 1.49-.915 0-1.636-.263-2.164-.789-.527-.525-.79-1.202-.79-2.03 0-.853.27-1.547.813-2.083.542-.535 1.29-.803 2.24-.803.957 0 1.766.305 2.428.915V9.44c0-.79-.174-1.39-.523-1.798-.35-.407-.866-.612-1.548-.612-.663 0-1.196.22-1.598.663-.402.44-.602 1.053-.602 1.836h-1.81c0-1.282.39-2.28 1.17-2.993.78-.714 1.835-1.07 3.167-1.07 1.258 0 2.228.347 2.91 1.041.683.694 1.024 1.696 1.024 3.007v3.666c0 .484.116.852.348 1.106.232.253.544.38.936.38.35 0 .633-.127.847-.38.214-.253.32-.619.32-1.097v-1.417c0-1.636-.376-2.92-1.13-3.854-.754-.933-1.854-1.4-3.3-1.4-1.558 0-2.733.486-3.528 1.46-.795.972-1.192 2.336-1.192 4.093v.231c0 1.746.393 3.097 1.178 4.053.785.955 1.94 1.433 3.466 1.433 1.031 0 1.914-.22 2.65-.662.736-.442 1.28-.973 1.63-1.594l1.493 1.023c-.536.903-1.29 1.62-2.26 2.152zM12.4 12.19c-.433 0-.766.117-.998.35-.232.233-.348.547-.348.943 0 .378.113.682.338.913.225.231.55.347.973.347.458 0 .826-.145 1.104-.436.278-.29.417-.674.417-1.15v-.967H12.4z"/>
                </svg>
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
