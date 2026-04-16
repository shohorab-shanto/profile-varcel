'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Github, Linkedin, Twitter } from 'lucide-react';
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
    apiService.getProfile().then(setProfile).catch(() => null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-blue-500 font-mono font-medium tracking-widest uppercase mb-4">Contact</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Let's build something <span className="text-gradient">extraordinary</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Whether you have a specific project in mind or just want to explore possibilities, 
            I'm always open to discussing new opportunities and collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 rounded-3xl group"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-300">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-1">Email Me</h3>
                  <p className="text-lg font-medium text-slate-200">{profile?.email || 'shohorab@example.com'}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 rounded-3xl group"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-1">Location</h3>
                  <p className="text-lg font-medium text-slate-200">{profile?.location || 'Dhaka, Bangladesh'}</p>
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
              <div className="flex gap-4">
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
                    <Twitter size={22} />
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

