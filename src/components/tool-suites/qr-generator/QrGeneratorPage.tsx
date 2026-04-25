import { motion } from 'framer-motion';
import { ArrowRight, ScanLine, Sparkles, WandSparkles } from 'lucide-react';

export default function QrGeneratorPage() {
  return (
    <>
      <section className="pt-40 pb-12 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pepdf-primary/10 dark:bg-pepdf-primary/20 text-pepdf-primary text-sm font-semibold mb-8 border border-pepdf-primary/20"
          >
            QR Workflow Center
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 text-pepdf-purple-dark dark:text-white leading-[1.08]"
          >
            Choose Your
            <br />
            <span className="bg-gradient-to-r from-pepdf-primary to-pepdf-blue-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              QR Flow
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto"
          >
            Work in three dedicated views: quick generator, advanced studio inspired by your notebook flow, and QR scan station.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Basic Generator',
              description: 'Create a QR from plain text or links with a fast and focused setup.',
              href: '/qr-generator/basic',
              icon: <Sparkles className="w-7 h-7" />,
            },
            {
              title: 'Advanced Studio',
              description: 'Use notebook-style controls for error level, logo shape, logo size, and white margin.',
              href: '/qr-generator/advanced',
              icon: <WandSparkles className="w-7 h-7" />,
            },
            {
              title: 'Scan Station',
              description: 'Scan and decode QR images with a dedicated workflow for camera or upload.',
              href: '/qr-generator/scan',
              icon: <ScanLine className="w-7 h-7" />,
            },
          ].map((item, index) => (
            <motion.a
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 + index * 0.1 }}
              className="group glass-card bg-white/70 dark:bg-white/5 rounded-3xl p-7 border border-slate-200/80 dark:border-white/10 hover:border-pepdf-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-pepdf-primary/15 text-pepdf-primary flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-3">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{item.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-pepdf-primary">
                Open view
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.a>
          ))}
        </div>
      </section>
    </>
  );
}
