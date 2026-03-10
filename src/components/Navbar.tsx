import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { FileText, QrCode, Shield, RefreshCw } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'PDF Tools', href: '/pdf-tools', icon: <FileText className="w-4 h-4" /> },
    { label: 'QR Generator', href: '/qr-generator', icon: <QrCode className="w-4 h-4" /> },
    { label: 'Convert', href: '/convert', icon: <RefreshCw className="w-4 h-4" /> },
    { label: 'Protect', href: '/protect', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <nav className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-0`}>
      <div 
        className={`max-w-4xl mx-auto glass-card rounded-2xl flex items-center justify-between p-3 px-6 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 dark:bg-pepdf-midnight/80 shadow-2xl backdrop-blur-xl' : 'bg-white/40 dark:bg-pepdf-midnight/40 backdrop-blur-lg'
        }`}
      >
        <a href="/" className="flex items-center gap-2 group cursor-pointer" aria-label="Go to homepage">
          <div className="w-10 h-10 bg-pepdf-primary rounded-xl flex items-center justify-center text-white font-bold text-xl transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-pepdf-primary/40">
            P
          </div>
          <span className="text-xl font-display font-bold text-pepdf-purple-dark dark:text-white group-hover:text-pepdf-primary transition-colors">
            PePDF
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-pepdf-primary dark:hover:text-pepdf-primary hover:bg-pepdf-primary/5 dark:hover:bg-pepdf-primary/10 transition-all flex items-center gap-2"
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="/pdf-tools" className="btn-primary md:flex hidden">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}