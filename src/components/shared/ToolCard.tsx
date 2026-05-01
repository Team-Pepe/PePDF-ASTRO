import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  delay?: number;
  href?: string;
}

export default function ToolCard({ title, description, icon, color, delay = 0, href }: ToolCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="group relative cursor-pointer"
    >
      <div className="absolute inset-0 bg-pepdf-primary/10 dark:bg-pepdf-primary/5 rounded-3xl blur-2xl group-hover:blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      
      <div className="relative glass-card p-8 rounded-3xl h-full flex flex-col items-start gap-6 bg-white/40 dark:bg-white/5 backdrop-blur-md dark:border-white/10 group-hover:border-pepdf-primary/30 group-hover:bg-white/70 dark:group-hover:bg-white/10 transition-all duration-300 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-display font-bold text-pepdf-purple-dark dark:text-white group-hover:text-pepdf-primary transition-colors">
            {title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm md:text-base">
            {description}
          </p>
        </div>

        <div className="mt-auto pt-6 w-full flex items-center justify-between">
          <span className="text-pepdf-primary font-semibold flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
            Start Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-pepdf-midnight bg-slate-200 dark:bg-slate-700 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return <a href={href} className="block">{content}</a>;
  }

  return content;
}