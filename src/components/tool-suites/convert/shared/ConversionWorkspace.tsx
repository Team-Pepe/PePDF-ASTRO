import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

interface WorkspaceStat {
  label: string;
  value: string;
}

interface WorkspaceStep {
  title: string;
  description: string;
}

interface ConversionWorkspaceProps {
  badge: string;
  titleStart: string;
  titleAccent: string;
  description: string;
  accentColor: string;
  backHref: string;
  backLabel: string;
  stats: WorkspaceStat[];
  steps: WorkspaceStep[];
  relatedHref: string;
  relatedTitle: string;
  relatedDescription: string;
  relatedCta: string;
  children: ReactNode;
}

export default function ConversionWorkspace({
  badge,
  titleStart,
  titleAccent,
  description,
  accentColor,
  backHref,
  backLabel,
  stats,
  steps,
  relatedHref,
  relatedTitle,
  relatedDescription,
  relatedCta,
  children,
}: ConversionWorkspaceProps) {
  return (
    <main className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[26rem] bg-[radial-gradient(circle_at_top,rgba(82,40,204,0.16),transparent_60%),radial-gradient(circle_at_right,rgba(124,158,178,0.16),transparent_45%)]" />
      <div className="max-w-6xl mx-auto">
        <motion.a
          href={backHref}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-white/5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-pepdf-primary hover:border-pepdf-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </motion.a>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 text-sm font-semibold mb-6"
              style={{ color: accentColor }}
            >
              <Sparkles className="w-4 h-4" />
              {badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold leading-[1.04] text-pepdf-purple-dark dark:text-white"
            >
              {titleStart}
              <br />
              <span className="bg-gradient-to-r bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
                style={{ backgroundImage: `linear-gradient(90deg, ${accentColor}, #7C9EB2, #5228CC)` }}
              >
                {titleAccent}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-6 max-w-2xl text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-3xl bg-white/65 dark:bg-white/5 p-5 shadow-xl shadow-slate-200/40 dark:shadow-none"
                >
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">{stat.label}</div>
                  <div className="text-xl md:text-2xl font-display font-bold text-pepdf-purple-dark dark:text-white">
                    {stat.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="glass-card rounded-[2rem] bg-white/70 dark:bg-white/5 p-6 md:p-7 border border-slate-200/70 dark:border-white/10 shadow-2xl shadow-slate-200/30 dark:shadow-none"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg"
                style={{ background: `linear-gradient(135deg, ${accentColor}, #7C9EB2)` }}
              >
                <ArrowRight className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Workspace guide</p>
                <p className="font-semibold text-pepdf-purple-dark dark:text-white">Fast, focused, and private</p>
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-xl text-white text-sm font-semibold flex items-center justify-center shrink-0"
                      style={{ backgroundColor: accentColor }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-pepdf-purple-dark dark:text-white">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={relatedHref}
              className="mt-6 block rounded-[1.75rem] border border-dashed border-slate-300 dark:border-white/10 bg-white/75 dark:bg-white/5 p-5 transition-all duration-300 hover:border-pepdf-primary hover:-translate-y-0.5"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2">Switch direction</p>
              <h3 className="text-xl font-display font-bold text-pepdf-purple-dark dark:text-white">{relatedTitle}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{relatedDescription}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-pepdf-primary">
                {relatedCta}
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </motion.aside>
        </div>
      </div>

      <section className="mt-14 px-0">
        {children}
      </section>
    </main>
  );
}
