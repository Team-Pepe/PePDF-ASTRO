import { motion } from 'framer-motion';
import { ArrowRight, UploadCloud } from 'lucide-react';
import { ReactNode } from 'react';
import ToolCard from '../shared/ToolCard';
import FAQAccordion, { FaqItem } from '../shared/FAQAccordion';

export interface SuiteTool {
  title: string;
  description: string;
  color: string;
  icon: ReactNode;
  href?: string;
}

interface ToolSuitePageProps {
  badge: string;
  titleStart: string;
  titleAccent: string;
  description: string;
  categories: string[];
  highlights: string[];
  tools: SuiteTool[];
  faqs: FaqItem[];
  primaryCta: string;
  secondaryCta: string;
}

export default function ToolSuitePage({
  badge,
  titleStart,
  titleAccent,
  description,
  categories,
  highlights,
  tools,
  faqs,
  primaryCta,
  secondaryCta,
}: ToolSuitePageProps) {
  return (
    <>
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pepdf-primary/10 dark:bg-pepdf-primary/20 text-pepdf-primary text-sm font-semibold mb-8 border border-pepdf-primary/20"
          >
            {badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-7 text-pepdf-purple-dark dark:text-white leading-[1.1]"
          >
            {titleStart}
            <br />
            <span className="bg-gradient-to-r from-pepdf-primary to-pepdf-blue-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              {titleAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-10"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="px-4 py-2 rounded-full border border-slate-300 dark:border-white/10 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-white/5 hover:border-pepdf-primary hover:text-pepdf-primary transition-colors"
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="pb-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((highlight) => (
            <div
              key={highlight}
              className="glass-card rounded-2xl bg-white/50 dark:bg-white/5 px-4 py-4 text-center text-sm font-semibold text-pepdf-purple-dark dark:text-white"
            >
              {highlight}
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <ToolCard key={tool.title} {...tool} href={tool.href} delay={index * 0.08} />
            ))}
          </div>

          <div className="mt-16 glass-card bg-white/60 dark:bg-white/5 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-3">
                Start with one file. Scale to batches later.
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
                Upload your file to preview processing options, output quality, and recommended settings before running the final action.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button" className="btn-primary">
                <UploadCloud className="w-4 h-4" />
                {primaryCta}
              </button>
              <button
                type="button"
                className="px-6 py-2.5 rounded-full border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-pepdf-primary hover:text-pepdf-primary transition-colors flex items-center gap-2"
              >
                {secondaryCta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion title="Common questions" items={faqs} />
    </>
  );
}
