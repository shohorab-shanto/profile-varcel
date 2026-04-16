'use client';

import { ThemeProvider } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Profile } from '@/lib/types';

export default function ClientLayout({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: Profile | null;
}) {
  const pathname = usePathname();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-grid -z-10" />
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10 animate-pulse delay-700" />

        <Navbar profile={profile} />
        
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-grow"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        <Footer profile={profile} />
      </div>
    </ThemeProvider>
  );
}
