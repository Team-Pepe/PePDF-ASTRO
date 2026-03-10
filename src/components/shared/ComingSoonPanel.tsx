import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ComingSoonPanelProps {
  title: string;
  subtitle: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export default function ComingSoonPanel({
  title,
  subtitle,
  ctaHref = '/',
  ctaLabel = 'Back to home',
}: ComingSoonPanelProps) {
  return (
    <section className="pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pepdf-primary/10 dark:bg-pepdf-primary/20 text-pepdf-primary text-sm font-semibold mb-8 border border-pepdf-primary/20"
        >
          <Sparkles className="w-4 h-4" />
          In progress
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold mb-6 text-pepdf-purple-dark dark:text-white"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10"
        >
          {subtitle}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          href={ctaHref}
          className="btn-primary inline-flex"
        >
          {ctaLabel}
        </motion.a>
      </div>
    </section>
  );
}
