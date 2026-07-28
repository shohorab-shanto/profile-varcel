'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { apiService } from '@/lib/api';
import { Profile } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function ContactPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMsg('All fields are required.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      await apiService.sendMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error("Failed to send message:", err);
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Failed to send message. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-slate-950">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[35%] h-[35%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-blue-500 font-mono font-medium tracking-widest uppercase mb-4">Contact</h2>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">Let's build something <span className="text-gradient">incredible</span></h1>
          <p className="text-slate-400 text-lg">Have a project in mind, a job opportunity, or just want to say hello? Drop a message below!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 rounded-3xl space-y-6"
            >
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-mono">Email</p>
                  <a href={`mailto:${profile?.email || 'shohorabshanto@gmail.com'}`} className="font-semibold hover:text-blue-500 transition-colors">
                    {profile?.email || 'shohorabshanto@gmail.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-mono">Location</p>
                  <p className="font-semibold">{profile?.location || 'Dhaka, Bangladesh'}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 rounded-3xl"
            >
              <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-6">Connect with me</h3>
              <div className="flex gap-4 flex-wrap">
                {profile?.github_url && (
                  <a href={profile.github_url} target="_blank" className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
                    <Github size={22} />
                  </a>
                )}
                {profile?.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
                    <Linkedin size={22} />
                  </a>
                )}
                {profile?.twitter_url && (
                  <a href={profile.twitter_url} target="_blank" className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
                    <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
                {profile?.medium_url && (
                  <a href={profile.medium_url} target="_blank" className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
                    <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42zm3.04 0c0 3.24-.31 5.86-.7 5.86s-.7-2.62-.7-5.86.31-5.86.7-5.86.7 2.62.7 5.86z"/>
                    </svg>
                  </a>
                )}
                {profile?.threads_url && (
                  <a href={profile.threads_url} target="_blank" className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
                    <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.846 14.85c-.947.603-2.072.9-3.376.9-1.854 0-3.27-.582-4.248-1.747-.978-1.165-1.467-2.738-1.467-4.722v-.22c0-1.996.48-3.58 1.442-4.75C9.158 5.283 10.59 4.7 12.483 4.7c1.828 0 3.208.563 4.14 1.688.932 1.125 1.398 2.668 1.398 4.629v1.442c0 .9-.228 1.597-.685 2.09-.457.494-1.042.741-1.753.741-.536 0-1.026-.2-1.468-.6-.44-.4-.73-.918-.868-1.554-.86.993-1.895 1.49-3.107 1.49-.915 0-1.636-.263-2.164-.789-.527-.525-.79-1.202-.79-2.03 0-.853.27-1.547.813-2.083.542-.535 1.29-.803 2.24-.803.957 0 1.766.305 2.428.915V9.44c0-.79-.174-1.39-.523-1.798-.35-.407-.866-.612-1.548-.612-.663 0-1.196.22-1.598.663-.402.44-.602 1.053-.602 1.836h-1.81c0-1.282.39-2.28 1.17-2.993.78-.714 1.835-1.07 3.167-1.07 1.258 0 2.228.347 2.91 1.041.683.694 1.024 1.696 1.024 3.007v3.666c0 .484.116.852.348 1.106.232.253.544.38.936.38.35 0 .633-.127.847-.38.214-.253.32-.619.32-1.097v-1.417c0-1.636-.376-2.92-1.13-3.854-.754-.933-1.854-1.4-3.3-1.4-1.558 0-2.733.486-3.528 1.46-.795.972-1.192 2.336-1.192 4.093v.231c0 1.746.393 3.097 1.178 4.053.785.955 1.94 1.433 3.466 1.433 1.031 0 1.914-.22 2.65-.662.736-.442 1.28-.973 1.63-1.594l1.493 1.023c-.536.903-1.29 1.62-2.26 2.152zM12.4 12.19c-.433 0-.766.117-.998.35-.232.233-.348.547-.348.943 0 .378.113.682.338.913.225.231.55.347.973.347.458 0 .826-.145 1.104-.436.278-.29.417-.674.417-1.15v-.967H12.4z"/>
                    </svg>
                  </a>
                )}
                {profile?.instagram_url && (
                  <a href={profile.instagram_url} target="_blank" className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
                    <Instagram size={22} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-8 md:p-12 rounded-[2rem] border-slate-800/50 relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="floating-label-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=" "
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all peer"
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute left-5 top-4 text-slate-500 transition-all pointer-events-none peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:bg-slate-900 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-500 peer-[:not(:placeholder-shown)]:bg-slate-900 peer-[:not(:placeholder-shown)]:px-2"
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="floating-label-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=" "
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all peer"
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-5 top-4 text-slate-500 transition-all pointer-events-none peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:bg-slate-900 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-500 peer-[:not(:placeholder-shown)]:bg-slate-900 peer-[:not(:placeholder-shown)]:px-2"
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="floating-label-group">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all peer resize-none"
                  />
                  <label 
                    htmlFor="message" 
                    className="absolute left-5 top-4 text-slate-500 transition-all pointer-events-none peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:bg-slate-900 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-500 peer-[:not(:placeholder-shown)]:bg-slate-900 peer-[:not(:placeholder-shown)]:px-2"
                  >
                    Your Message
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full group relative overflow-hidden px-8 py-5 rounded-2xl bg-blue-600 text-white font-bold transition-all hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === 'loading' ? 'Transmitting...' : (
                      <>
                        Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl"
                  >
                    <CheckCircle className="shrink-0" size={20} />
                    <p className="text-sm font-medium">Your message has been received. I'll get back to you soon!</p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl"
                  >
                    <AlertCircle className="shrink-0" size={20} />
                    <p className="text-sm font-medium">{errorMsg}</p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

