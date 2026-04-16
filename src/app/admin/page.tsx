'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '@/lib/api';
import { Project, Skill, Profile, ProjectImage, Experience, Education, ContactMessage, SiteSetting } from '@/lib/types';
import { Plus, Trash2, Edit2, LogOut, CheckCircle, AlertCircle, Upload, FileText, Image as ImageIcon, User, Briefcase, Trash, Layout, Mail, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import ImageCropper from '@/components/admin/ImageCropper';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'profile' | 'footer' | 'experience' | 'education' | 'contacts'>('projects');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducationList] = useState<Education[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSetting | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState('');

  // Image Cropping States
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [cropTarget, setCropTarget] = useState<'profile' | 'project' | null>(null);
  const [cropAspect, setCropAspect] = useState(1);
  const [circularCrop, setCircularCrop] = useState(false);

  // Form states
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_link: '',
    live_link: '',
    featured: false,
    image: null as File | null,
  });

  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'frontend' as Skill['category'],
  });

  const [experienceForm, setExperienceForm] = useState({
    company: '',
    role: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  const [educationForm, setEducationForm] = useState({
    institute: '',
    degree: '',
    year: '',
  });

  const [profileForm, setProfileForm] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    location: '',
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
    facebook_url: '',
    instagram_url: '',
    footer_text: '',
    profile_photo: null as File | null,
    cv_file: null as File | null,
  });

  const [siteSettingsForm, setSiteSettingsForm] = useState({
    hero_title: '',
    hero_subtitle: '',
    hero_description: '',
    resume_button_text: '',
    contact_button_text: '',
  });

  const fetchData = async () => {
    try {
      setIsDataLoading(true);
      const [p, s, prof, exp, edu, cont, settings] = await Promise.all([
        apiService.getProjects().catch(() => []),
        apiService.getSkills().catch(() => []),
        apiService.getProfile().catch(() => null),
        apiService.getExperience().catch(() => []),
        apiService.getEducation().catch(() => []),
        apiService.getContacts().catch(() => []),
        apiService.getSiteSettings().catch(() => null),
      ]);

      setProjects(p || []);
      setSkills(s || []);
      setExperiences(exp || []);
      setEducationList(edu || []);
      setContacts(cont || []);
      if (prof) {
        setProfile(prof);
        setProfileForm({
          name: prof.name || '',
          title: prof.title || '',
          bio: prof.bio || '',
          email: prof.email || '',
          location: prof.location || '',
          github_url: prof.github_url || '',
          linkedin_url: prof.linkedin_url || '',
          twitter_url: prof.twitter_url || '',
          facebook_url: prof.facebook_url || '',
          instagram_url: prof.instagram_url || '',
          footer_text: prof.footer_text || '',
          profile_photo: null,
          cv_file: null,
        });
      }
      if (settings) {
        setSiteSettings(settings);
        setSiteSettingsForm({
          hero_title: settings.hero_title || '',
          hero_subtitle: settings.hero_subtitle || '',
          hero_description: settings.hero_description || '',
          resume_button_text: settings.resume_button_text || '',
          contact_button_text: settings.contact_button_text || '',
        });
      }
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsLoggedIn(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await apiService.login(credentials);
      localStorage.setItem('admin_token', res.token);
      setIsLoggedIn(true);
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsLoggedIn(false);
  };

  // Image Cropping Handlers
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'profile' | 'project') => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageToCrop(reader.result as string);
        setCropTarget(target);
        if (target === 'profile') {
          setCropAspect(1);
          setCircularCrop(true);
        } else {
          setCropAspect(16 / 9);
          setCircularCrop(false);
        }
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedImage: File) => {
    if (cropTarget === 'profile') {
      setProfileForm({ ...profileForm, profile_photo: croppedImage });
    } else if (cropTarget === 'project') {
      setProjectForm({ ...projectForm, image: croppedImage });
    }
    setImageToCrop(null);
    setCropTarget(null);
  };

  // Profile Handlers
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', profileForm.name);
      formData.append('title', profileForm.title);
      formData.append('bio', profileForm.bio);
      formData.append('email', profileForm.email);
      formData.append('location', profileForm.location);
      formData.append('github_url', profileForm.github_url);
      formData.append('linkedin_url', profileForm.linkedin_url);
      formData.append('twitter_url', profileForm.twitter_url);
      formData.append('facebook_url', profileForm.facebook_url);
      formData.append('instagram_url', profileForm.instagram_url);
      formData.append('footer_text', profileForm.footer_text);
      if (profileForm.profile_photo) formData.append('profile_photo', profileForm.profile_photo);
      if (profileForm.cv_file) formData.append('cv_file', profileForm.cv_file);

      const updated = await apiService.updateProfile(formData);
      setProfile(updated);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Project Handlers
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', projectForm.title);
      formData.append('description', projectForm.description);
      const techStackArr = projectForm.tech_stack.split(',').map(s => s.trim());
      techStackArr.forEach((tech, i) => formData.append(`tech_stack[${i}]`, tech));
      formData.append('github_link', projectForm.github_link);
      formData.append('live_link', projectForm.live_link);
      formData.append('featured', projectForm.featured ? '1' : '0');
      if (projectForm.image) formData.append('image', projectForm.image);

      if (editingProject) {
        const updated = await apiService.updateProject(editingProject.id, formData);
        setProjects(projects.map(p => p.id === updated.id ? updated : p));
        setEditingProject(null);
      } else {
        const created = await apiService.createProject(formData);
        setProjects([...projects, created]);
        setIsAddingProject(false);
      }
      resetProjectForm();
    } catch (err) {
      alert('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      tech_stack: '',
      github_link: '',
      live_link: '',
      featured: false,
      image: null,
    });
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await apiService.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  const handleUploadProjectImages = async (projectId: number, files: FileList | null) => {
    if (!files) return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images[]', files[i]);
    }
    try {
      const newImages = await apiService.uploadProjectImages(projectId, formData);
      setProjects(projects.map(p => p.id === projectId ? { ...p, images: [...(p.images || []), ...newImages] } : p));
    } catch (err) {
      alert('Failed to upload images');
    }
  };

  const handleDeleteProjectImage = async (projectId: number, imageId: number) => {
    try {
      await apiService.deleteProjectImage(imageId);
      setProjects(projects.map(p => p.id === projectId ? { ...p, images: (p.images || []).filter(img => img.id !== imageId) } : p));
    } catch (err) {
      alert('Failed to delete image');
    }
  };

  // Skill Handlers
  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingSkill) {
        const updated = await apiService.updateSkill(editingSkill.id, skillForm);
        setSkills(skills.map(s => s.id === updated.id ? updated : s));
      } else {
        const created = await apiService.createSkill(skillForm);
        setSkills([...skills, created]);
      }
      setIsAddingSkill(false);
      setEditingSkill(null);
      setSkillForm({ name: '', category: 'frontend' });
    } catch (err) {
      alert('Failed to save skill');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await apiService.deleteSkill(id);
      setSkills(skills.filter(s => s.id !== id));
    } catch (err) {
      alert('Failed to delete skill');
    }
  };

  // Site Settings Handlers
  const handleUpdateSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await apiService.updateSiteSettings(siteSettingsForm);
      setSiteSettings(updated);
      alert('Site settings updated successfully!');
    } catch (err) {
      alert('Failed to update site settings');
    } finally {
      setLoading(false);
    }
  };

  // Experience Handlers
  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingExperience) {
        const updated = await apiService.updateExperience(editingExperience.id, experienceForm);
        setExperiences(experiences.map(exp => exp.id === updated.id ? updated : exp));
      } else {
        const created = await apiService.createExperience(experienceForm);
        setExperiences([...experiences, created]);
      }
      setIsAddingExperience(false);
      setEditingExperience(null);
      setExperienceForm({ company: '', role: '', description: '', start_date: '', end_date: '' });
    } catch (err) {
      alert('Failed to save experience');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    try {
      await apiService.deleteExperience(id);
      setExperiences(experiences.filter(exp => exp.id !== id));
    } catch (err) {
      alert('Failed to delete experience');
    }
  };

  // Education Handlers
  const handleEducationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingEducation) {
        const updated = await apiService.updateEducation(editingEducation.id, educationForm);
        setEducationList(educations.map(edu => edu.id === updated.id ? updated : edu));
      } else {
        const created = await apiService.createEducation(educationForm);
        setEducationList([...educations, created]);
      }
      setIsAddingEducation(false);
      setEditingEducation(null);
      setEducationForm({ institute: '', degree: '', year: '' });
    } catch (err) {
      alert('Failed to save education');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEducation = async (id: number) => {
    if (!confirm('Are you sure you want to delete this education record?')) return;
    try {
      await apiService.deleteEducation(id);
      setEducationList(educations.filter(edu => edu.id !== id));
    } catch (err) {
      alert('Failed to delete education');
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await apiService.deleteContact(id);
      setContacts(contacts.filter(c => c.id !== id));
    } catch (err) {
      alert('Failed to delete message');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
        </div>

        <div className="max-w-md w-full glass-card p-10 rounded-[2.5rem] border-slate-800/50 shadow-2xl relative">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
              <User className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Control</h1>
            <p className="text-slate-400">Please sign in to manage your portfolio</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-mono text-slate-500 uppercase tracking-wider ml-1">Email</label>
              <input
                type="email"
                required
                placeholder="admin@example.com"
                className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-mono text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm flex items-center gap-2 bg-red-500/10 p-4 rounded-xl border border-red-500/20"
              >
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Control Center</h1>
            <p className="text-slate-400">Welcome back, {profile?.name || 'Admin'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20 active:scale-95"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        {/* Glass Tabs */}
        <div className="glass-card p-2 rounded-3xl mb-12 flex flex-wrap gap-2 border-slate-800/50">
          {[
            { id: 'projects', label: 'Projects', icon: <Briefcase size={20} /> },
            { id: 'skills', label: 'Skills', icon: <ImageIcon size={20} /> },
            { id: 'experience', label: 'Experience', icon: <Briefcase size={20} /> },
            { id: 'education', label: 'Education', icon: <GraduationCap size={20} /> },
            { id: 'profile', label: 'Profile', icon: <User size={20} /> },
            { id: 'footer', label: 'Footer', icon: <Layout size={20} /> },
            { id: 'contacts', label: 'Messages', icon: <Mail size={20} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {isDataLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-400 font-mono text-sm animate-pulse">Syncing Control Center Data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'profile' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl glass-card p-10 rounded-[2.5rem] border-slate-800/50"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <User className="text-blue-500" /> Identity Settings
            </h2>
            <form onSubmit={handleUpdateProfile} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-2">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Professional Title</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Public Email</label>
                  <input
                    type="email"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Professional Bio</label>
                  <textarea
                    rows={5}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200 resize-none"
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  />
                </div>
                <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-card p-6 rounded-2xl border-slate-800/50">
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 block">Avatar Image</label>
                    <div className="flex items-center gap-6">
                      {profile?.profile_photo_url && (
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                          <Image src={profile.profile_photo_url} alt="Profile" fill className="object-cover" />
                        </div>
                      )}
                      <label className="flex-1 px-4 py-3 rounded-xl border border-dashed border-slate-700 hover:border-blue-500 hover:bg-blue-500/5 transition-all cursor-pointer text-center text-sm text-slate-400">
                        <Upload size={18} className="mx-auto mb-1" />
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => onFileChange(e, 'profile')}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="glass-card p-6 rounded-2xl border-slate-800/50">
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 block">Resume (PDF)</label>
                    <div className="flex items-center gap-6">
                      {profile?.cv_file_url && (
                        <a href={profile.cv_file_url} target="_blank" className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                          <FileText size={32} />
                        </a>
                      )}
                      <label className="flex-1 px-4 py-3 rounded-xl border border-dashed border-slate-700 hover:border-blue-500 hover:bg-blue-500/5 transition-all cursor-pointer text-center text-sm text-slate-400">
                        <Upload size={18} className="mx-auto mb-1" />
                        Update CV
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => setProfileForm({ ...profileForm, cv_file: e.target.files?.[0] || null })}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20"
              >
                {loading ? 'Processing...' : 'Save Changes'}
              </button>
            </form>
          </motion.section>
        )}

        {activeTab === 'footer' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl glass-card p-10 rounded-[2.5rem] border-slate-800/50"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Layout className="text-blue-500" /> Branding & Hero Settings
            </h2>
            
            <div className="space-y-12">
              {/* Site Branding */}
              <form onSubmit={handleUpdateProfile} className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest pl-2 border-l-2 border-blue-600">Site Branding</h3>
                  <div>
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Footer Attribution</label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                      value={profileForm.footer_text}
                      onChange={(e) => setProfileForm({ ...profileForm, footer_text: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">GitHub</label>
                      <input
                        type="url"
                        className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                        value={profileForm.github_url}
                        onChange={(e) => setProfileForm({ ...profileForm, github_url: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">LinkedIn</label>
                      <input
                        type="url"
                        className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                        value={profileForm.linkedin_url}
                        onChange={(e) => setProfileForm({ ...profileForm, linkedin_url: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20"
                >
                  {loading ? 'Saving...' : 'Update Branding'}
                </button>
              </form>

              {/* Hero Settings */}
              <form onSubmit={handleUpdateSiteSettings} className="space-y-8 pt-8 border-t border-slate-800">
                <div className="space-y-6">
                  <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest pl-2 border-l-2 border-purple-600">Hero Section Content</h3>
                  <div>
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Hero Title (Use [name] for highlight)</label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                      value={siteSettingsForm.hero_title}
                      onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, hero_title: e.target.value })}
                      placeholder="Hi, I'm [name]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Hero Subtitles (Comma separated for typing effect)</label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                      value={siteSettingsForm.hero_subtitle}
                      onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, hero_subtitle: e.target.value })}
                      placeholder="Full-Stack Developer, AI Enthusiast"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Hero Description</label>
                    <textarea
                      rows={3}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200 resize-none"
                      value={siteSettingsForm.hero_description}
                      onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, hero_description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Resume Button Text</label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                        value={siteSettingsForm.resume_button_text}
                        onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, resume_button_text: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Contact Button Text</label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                        value={siteSettingsForm.contact_button_text}
                        onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, contact_button_text: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-500 active:scale-[0.98] transition-all shadow-lg shadow-purple-500/20"
                >
                  {loading ? 'Saving...' : 'Update Hero Settings'}
                </button>
              </form>
            </div>
          </motion.section>
        )}

        {activeTab === 'experience' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Experience History</h2>
              <button
                onClick={() => {
                  setEditingExperience(null);
                  setExperienceForm({ company: '', role: '', description: '', start_date: '', end_date: '' });
                  setIsAddingExperience(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                <Plus size={20} /> Add Experience
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[...experiences].sort((a, b) => {
                const isACurrent = !a.end_date || a.end_date.toLowerCase() === 'present' || a.end_date.toLowerCase() === 'continue';
                const isBCurrent = !b.end_date || b.end_date.toLowerCase() === 'present' || b.end_date.toLowerCase() === 'continue';
                if (isACurrent && !isBCurrent) return -1;
                if (!isACurrent && isBCurrent) return 1;
                const parseDate = (dateStr: string) => {
                  if (!dateStr) return 0;
                  if (dateStr.includes('/')) {
                    const [month, year] = dateStr.split('/');
                    return new Date(parseInt(year), parseInt(month) - 1).getTime();
                  }
                  return new Date(dateStr).getTime() || 0;
                };
                return parseDate(b.start_date) - parseDate(a.start_date);
              }).map((exp) => (
                <div key={exp.id} className="glass-card p-8 rounded-[2rem] border-slate-800/50 flex justify-between items-center group">
                  <div>
                    <h3 className="text-xl font-bold text-slate-200">{exp.role}</h3>
                    <p className="text-blue-500 font-medium">{exp.company}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {exp.start_date} - <span className={(!exp.end_date || exp.end_date.toLowerCase() === 'present' || exp.end_date.toLowerCase() === 'continue') ? 'text-blue-400 font-bold' : ''}>
                        {exp.end_date || 'Present'}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingExperience(exp);
                        setExperienceForm({
                          company: exp.company,
                          role: exp.role,
                          description: exp.description,
                          start_date: exp.start_date,
                          end_date: exp.end_date || '',
                        });
                        setIsAddingExperience(true);
                      }}
                      className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="p-3 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'education' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Education Records</h2>
              <button
                onClick={() => {
                  setEditingEducation(null);
                  setEducationForm({ institute: '', degree: '', year: '' });
                  setIsAddingEducation(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                <Plus size={20} /> Add Education
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {educations.map((edu) => (
                <div key={edu.id} className="glass-card p-8 rounded-[2rem] border-slate-800/50 flex justify-between items-center group">
                  <div>
                    <h3 className="text-xl font-bold text-slate-200">{edu.degree}</h3>
                    <p className="text-blue-500 font-medium">{edu.institute}</p>
                    <p className="text-sm text-slate-500 mt-1">{edu.year}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingEducation(edu);
                        setEducationForm({
                          institute: edu.institute,
                          degree: edu.degree,
                          year: edu.year,
                        });
                        setIsAddingEducation(true);
                      }}
                      className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="p-3 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'contacts' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-8">Inbound Messages</h2>
            <div className="grid grid-cols-1 gap-6">
              {contacts.map((msg) => (
                <div key={msg.id} className="glass-card p-8 rounded-[2rem] border-slate-800/50 group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-200">{msg.name}</h3>
                      <p className="text-blue-500 text-sm">{msg.email}</p>
                      <p className="text-xs text-slate-500 mt-1">{new Date(msg.created_at).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteContact(msg.id)}
                      className="p-3 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                    <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
              {contacts.length === 0 && (
                <div className="py-24 glass rounded-[2rem] text-center text-foreground/40 border-dashed">
                  <p>No messages received yet.</p>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {activeTab === 'skills' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Skill Management</h2>
              <button
                onClick={() => {
                  setEditingSkill(null);
                  setSkillForm({ name: '', category: 'frontend' });
                  setIsAddingSkill(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                <Plus size={20} /> Add New Skill
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {['frontend', 'backend', 'devops', 'ai'].map((cat) => (
                <div key={cat} className="space-y-6">
                  <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest pl-2 border-l-2 border-blue-600">{cat}</h3>
                  <div className="space-y-3">
                    {skills.filter(s => s.category === cat).map((skill) => (
                      <div key={skill.id} className="glass-card p-4 rounded-2xl border-slate-800/50 flex justify-between items-center group hover:border-blue-500/30 transition-all">
                        <span className="font-medium text-slate-300">{skill.name}</span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => {
                              setEditingSkill(skill);
                              setSkillForm({ name: skill.name, category: skill.category });
                              setIsAddingSkill(true);
                            }}
                            className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-xl transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'projects' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Project Portfolio</h2>
              <button
                onClick={() => { resetProjectForm(); setIsAddingProject(true); }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                <Plus size={20} /> Create Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="glass-card p-8 rounded-[2rem] border-slate-800/50 group hover:border-blue-500/30 transition-all">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Main Image Preview */}
                    {project.image_url && (
                      <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden border border-slate-800 shadow-xl flex-shrink-0">
                        <Image src={project.image_url} alt={project.title} fill className="object-cover" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors">{project.title}</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.tech_stack.map((tech, i) => (
                              <span key={i} className="px-3 py-1 bg-slate-900/50 border border-slate-800 rounded-lg text-xs text-slate-500">{tech}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingProject(project);
                              setProjectForm({
                                title: project.title,
                                description: project.description,
                                tech_stack: project.tech_stack.join(', '),
                                github_link: project.github_link || '',
                                live_link: project.live_link || '',
                                featured: project.featured,
                                image: null,
                              });
                            }}
                            className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-3 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-400 mb-8 line-clamp-3 leading-relaxed">{project.description}</p>
                    </div>
                  </div>

                  {/* Image Gallery */}
                  <div className="pt-6 border-t border-slate-800">
                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <ImageIcon size={14} /> Assets Gallery
                    </h4>
                    <div className="flex flex-wrap gap-4 items-center">
                      {project.images?.map((img) => (
                        <div key={img.id} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-800 group/img">
                          <Image src={img.image_url} alt="Project" fill className="object-cover" />
                          <button
                            onClick={() => handleDeleteProjectImage(project.id, img.id)}
                            className="absolute inset-0 bg-red-600/90 text-white opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      ))}
                      <label className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 cursor-pointer transition-all">
                        <Upload size={20} />
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          onChange={(e) => handleUploadProjectImages(project.id, e.target.files)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </>
    )}
  </div>

      {/* Modern Modals */}
      {(isAddingProject || editingProject) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto py-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl w-full glass-card p-10 rounded-[2.5rem] border-slate-800/50 shadow-2xl relative"
          >
            <h2 className="text-3xl font-bold mb-8">{editingProject ? 'Refine Project' : 'New Project'}</h2>
            <form onSubmit={handleProjectSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Project Title</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Description</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200 resize-none"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Tech Stack</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={projectForm.tech_stack}
                    onChange={(e) => setProjectForm({ ...projectForm, tech_stack: e.target.value })}
                    placeholder="React, Tailwind, Framer Motion"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">GitHub Link</label>
                  <input
                    type="url"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={projectForm.github_link}
                    onChange={(e) => setProjectForm({ ...projectForm, github_link: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Live Demo</label>
                  <input
                    type="url"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={projectForm.live_link}
                    onChange={(e) => setProjectForm({ ...projectForm, live_link: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="glass-card p-6 rounded-2xl border-slate-800/50">
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 block">Main Showcase Image</label>
                    <div className="flex items-center gap-6">
                      {editingProject?.image_url && (
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                          <Image src={editingProject.image_url} alt="Current Showcase" fill className="object-cover" />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-600 cursor-pointer"
                        onChange={(e) => onFileChange(e, 'project')}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-1">
                <input
                  type="checkbox"
                  id="featured"
                  className="w-5 h-5 rounded border-slate-800 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                />
                <label htmlFor="featured" className="text-sm font-medium text-slate-300">Highlight as Featured Project</label>
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => { setIsAddingProject(false); setEditingProject(null); }}
                  className="px-8 py-4 rounded-2xl border border-slate-800 hover:bg-slate-900 transition-all font-bold"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                >
                  {loading ? 'Processing...' : 'Save Project'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Skill Modal */}
      {isAddingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full glass-card p-10 rounded-[2.5rem] border-slate-800/50 shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-8">{editingSkill ? 'Refine Skill' : 'New Skill'}</h2>
            <form onSubmit={handleSkillSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Skill Identity</label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g. TypeScript"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Specialization</label>
                <select
                  className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200 appearance-none cursor-pointer"
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as any })}
                >
                  <option value="frontend">Frontend Architecture</option>
                  <option value="backend">Backend Engineering</option>
                  <option value="devops">Cloud & Infrastructure</option>
                  <option value="ai">Artificial Intelligence</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => { setIsAddingSkill(false); setEditingSkill(null); }}
                  className="px-6 py-3 rounded-xl border border-slate-800 hover:bg-slate-900 transition-all font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                >
                  {loading ? 'Saving...' : 'Confirm'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Experience Modal */}
      {isAddingExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto py-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full glass-card p-10 rounded-[2.5rem] border-slate-800/50 shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-8">{editingExperience ? 'Refine Experience' : 'New Experience'}</h2>
            <form onSubmit={handleExperienceSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Company</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={experienceForm.company}
                    onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Role</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={experienceForm.role}
                    onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Start Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jan 2022"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={experienceForm.start_date}
                    onChange={(e) => setExperienceForm({ ...experienceForm, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">End Date (Leave blank for Present)</label>
                  <input
                    type="text"
                    placeholder="e.g. Dec 2023"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={experienceForm.end_date}
                    onChange={(e) => setExperienceForm({ ...experienceForm, end_date: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Description</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200 resize-none"
                    value={experienceForm.description}
                    onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => { setIsAddingExperience(false); setEditingExperience(null); }}
                  className="px-6 py-3 rounded-xl border border-slate-800 hover:bg-slate-900 transition-all font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                >
                  {loading ? 'Saving...' : 'Confirm'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Education Modal */}
      {isAddingEducation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto py-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full glass-card p-10 rounded-[2.5rem] border-slate-800/50 shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-8">{editingEducation ? 'Refine Education' : 'New Education'}</h2>
            <form onSubmit={handleEducationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Institute</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={educationForm.institute}
                    onChange={(e) => setEducationForm({ ...educationForm, institute: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Degree</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={educationForm.degree}
                    onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Year</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2018 - 2022"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                    value={educationForm.year}
                    onChange={(e) => setEducationForm({ ...educationForm, year: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => { setIsAddingEducation(false); setEditingEducation(null); }}
                  className="px-6 py-3 rounded-xl border border-slate-800 hover:bg-slate-900 transition-all font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                >
                  {loading ? 'Saving...' : 'Confirm'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Image Cropper Modal */}
      {imageToCrop && (
        <ImageCropper
          image={imageToCrop}
          aspect={cropAspect}
          circularCrop={circularCrop}
          onCropComplete={onCropComplete}
          onCancel={() => {
            setImageToCrop(null);
            setCropTarget(null);
          }}
        />
      )}
    </div>
  );
}
