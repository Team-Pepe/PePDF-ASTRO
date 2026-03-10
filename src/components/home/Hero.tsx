import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Files, ShieldCheck, QrCode } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-40 pb-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pepdf-primary/10 dark:bg-pepdf-primary/20 text-pepdf-primary text-sm font-semibold mb-8 backdrop-blur-sm border border-pepdf-primary/20"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>New: PDF Protection tools are here!</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-8xl font-display font-bold mb-8 text-pepdf-purple-dark dark:text-white leading-[1.1]"
        >
          Your All-In-One <br />
          <span className="bg-gradient-to-r from-pepdf-primary to-pepdf-blue-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            Digital Toolbox
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mb-12 leading-relaxed"
        >
          Fast, secure, and intuitive tools for every file need. Convert, protect, and generate QR codes in seconds, not minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="btn-primary text-lg px-8 py-4 shadow-xl shadow-pepdf-primary/30 group">
            Start Processing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-full border border-slate-300 dark:border-white/10 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300">
            Learn More
          </button>
        </motion.div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2 text-slate-400 font-medium text-sm md:text-lg">
            <Files className="w-5 h-5 md:w-6 md:h-6" />
            <span>50+ Formats</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-medium text-sm md:text-lg">
            <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
            <span>Cloud Secured</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-medium text-sm md:text-lg">
            <QrCode className="w-5 h-5 md:w-6 md:h-6" />
            <span>Custom QR</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-medium text-sm md:text-lg">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            <span>AI Powered</span>
          </div>
        </div>
      </div>
    </section>
  );
}