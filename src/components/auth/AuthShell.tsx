import { type FormEvent, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Workflow,
  Zap,
  AlertCircle,
} from 'lucide-react';
import AuthLoader from './AuthLoader';
import ThemeToggle from '../layout/ThemeToggle';
import { authService } from '../../services/auth';
import { useAuth, useAuthActions } from '../../hooks/useAuth';

type AuthMode = 'login' | 'register';

interface AuthField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  autoComplete: string;
}

interface AuthFeature {
  title: string;
  description: string;
}

interface AuthSnapshotItem {
  label: string;
  value: string;
}

interface AuthModeContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  formTitle: string;
  formSubtitle: string;
  submitLabel: string;
  helperLabel: string;
  helperActionLabel: string;
  helperActionHref: string;
  switchPrompt: string;
  switchLabel: string;
  helperText: string;
  successTitle: string;
  successText: string;
  features: AuthFeature[];
  snapshotTitle: string;
  snapshotDescription: string;
  snapshotItems: AuthSnapshotItem[];
  fields: AuthField[];
}

interface AuthShellProps {
  initialMode: AuthMode;
}

const statusItems = [
  { icon: ShieldCheck, label: 'Protected sessions' },
  { icon: Zap, label: 'Fast onboarding flow' },
  { icon: Sparkles, label: 'Theme-aware interface' },
];

const modeContent: Record<AuthMode, AuthModeContent> = {
  login: {
    eyebrow: 'Secure access',
    title: 'Return to your document workspace.',
    subtitle:
      'Log in to continue processing files, reviewing secure workflows, and jumping back into the exact tool chain you were using.',
    formTitle: 'Welcome back',
    formSubtitle: 'Use your email credentials to continue with your PePDF workspace.',
    submitLabel: 'Log in',
    helperLabel: 'Keep me signed in on this device',
    helperActionLabel: 'Need help?',
    helperActionHref: '/help-center',
    switchPrompt: 'Need a workspace?',
    switchLabel: 'Create account',
    helperText: 'Private, encrypted entry',
    successTitle: 'Session verified',
    successText: 'The login flow is ready to connect to a real authentication backend and loading sequence.',
    features: [
      {
        title: 'Resume recent tools',
        description: 'Pick up exactly where you left off with conversion, protection, and QR generation workflows.',
      },
      {
        title: 'Recover team context',
        description: 'Bring back saved workspace choices, output preferences, and secure access defaults.',
      },
      {
        title: 'Clean entry flow',
        description: 'The interface keeps the focus on credential entry without adding noise or decorative filler.',
      },
    ],
    snapshotTitle: 'Active workspace snapshot',
    snapshotDescription: 'What a returning user expects to recover immediately after logging in.',
    snapshotItems: [
      { label: 'Recent queue', value: '12 documents waiting' },
      { label: 'Protected sets', value: '4 secure exports active' },
      { label: 'Last session', value: 'Image to PDF workflow' },
    ],
    fields: [
      {
        name: 'email',
        label: 'Work email',
        type: 'email',
        placeholder: 'you@company.com',
        autoComplete: 'email',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        autoComplete: 'current-password',
      },
    ],
  },
  register: {
    eyebrow: 'Fast onboarding',
    title: 'Create your PePDF workspace in one clean step.',
    subtitle:
      'Open a polished account flow for teams and individual users who need document tools, secure sharing, and high-speed conversions in one place.',
    formTitle: 'Create account',
    formSubtitle: 'Start with the essentials and get your workspace ready for uploads, protection, and conversions.',
    submitLabel: 'Create account',
    helperLabel: 'I agree to the terms and privacy policy',
    helperActionLabel: 'Review policy',
    helperActionHref: '/privacy',
    switchPrompt: 'Already have an account?',
    switchLabel: 'Log in',
    helperText: 'Built for future auth logic',
    successTitle: 'Workspace blueprint created',
    successText: 'The registration flow is ready for backend onboarding, validation, and account provisioning.',
    features: [
      {
        title: 'Start with structure',
        description: 'New users understand immediately what the account unlocks instead of facing a generic signup wall.',
      },
      {
        title: 'Lower onboarding friction',
        description: 'The route from registration to first file action is designed to feel fast, focused, and product-led.',
      },
      {
        title: 'Future-ready states',
        description: 'Validation, loading, and confirmation moments are already shaped for a real product flow.',
      },
    ],
    snapshotTitle: 'First-run workspace setup',
    snapshotDescription: 'What a new user should feel they gain as soon as the account is created.',
    snapshotItems: [
      { label: 'Workspace type', value: 'Personal or team-ready' },
      { label: 'Secure defaults', value: 'Privacy and auth states enabled' },
      { label: 'First destination', value: 'Jump directly into tools' },
    ],
    fields: [
      {
        name: 'fullName',
        label: 'Full name',
        type: 'text',
        placeholder: 'Enter your full name',
        autoComplete: 'name',
      },
      {
        name: 'email',
        label: 'Work email',
        type: 'email',
        placeholder: 'you@company.com',
        autoComplete: 'email',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Create a secure password',
        autoComplete: 'new-password',
      },
      {
        name: 'confirmPassword',
        label: 'Confirm password',
        type: 'password',
        placeholder: 'Repeat your password',
        autoComplete: 'new-password',
      },
    ],
  },
};

function getModeFromPath(pathname: string): AuthMode {
  return pathname.includes('/register') ? 'register' : 'login';
}

export default function AuthShell({ initialMode }: AuthShellProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitTimerRef = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const content = modeContent[mode];

  // Use auth store
  useAuth(); // Subscribe to auth state changes
  const authActions = useAuthActions();

  useEffect(() => {
    const handlePopState = () => {
      setHasSubmitted(false);
      setMode(getModeFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.title = mode === 'login' ? 'PePDF | Log In' : 'PePDF | Register';
  }, [mode]);

  const handleModeChange = (nextMode: AuthMode) => {
    if (nextMode === mode) {
      return;
    }

    setHasSubmitted(false);
    setIsSubmitting(false);

    if (submitTimerRef.current !== null) {
      window.clearTimeout(submitTimerRef.current);
    }

    setMode(nextMode);
    window.history.pushState({}, '', nextMode === 'login' ? '/login' : '/register');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setHasSubmitted(false);
    setIsSubmitting(true);

    if (submitTimerRef.current !== null) {
      window.clearTimeout(submitTimerRef.current);
    }

    try {
      if (!formRef.current) return;

      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries()) as Record<string, string>;

      if (mode === 'login') {
        // Login: send email and password
        const result = await authService.login({
          email: data.email,
          password: data.password,
        });

        // Store user in auth store
        authActions.setUser({
          id: result.id,
          email: result.email,
          username: result.username,
        });

        // Show success message
        submitTimerRef.current = window.setTimeout(() => {
          setIsSubmitting(false);
          setHasSubmitted(true);

          // Redirect after 2 seconds
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        }, 1600);
      } else {
        // Register: send all fields
        const result = await authService.register({
          username: data.fullName,
          email: data.email,
          password: data.password,
        });

        // Store user in auth store
        authActions.setUser({
          id: result.id,
          email: result.email,
          username: result.username,
        });

        // Show success message
        submitTimerRef.current = window.setTimeout(() => {
          setIsSubmitting(false);
          setHasSubmitted(true);

          // Redirect after 2 seconds
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        }, 1600);
      }
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Auth error:', err);
    }
  };

  return (
    <section className="pt-16 pb-10 px-4 md:px-6 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.08fr_0.92fr] gap-6 lg:gap-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-card rounded-[2rem] bg-white/55 dark:bg-black/40 p-6 md:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pepdf-blue-light/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(82,40,204,0.09),_transparent_42%)] pointer-events-none" />

          <div className="relative">
            <div className="flex items-center justify-between gap-4 mb-10">
              <a href="/" className="inline-flex items-center gap-3 group" aria-label="Go to homepage">
                <div className="w-11 h-11 bg-pepdf-primary rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-pepdf-primary/30 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
                  P
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 mb-1">
                    PePDF
                  </p>
                  <p className="text-sm font-semibold text-pepdf-purple-dark dark:text-white">
                    Secure workspace access
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <a href="/" className="btn-secondary hidden sm:inline-flex">
                  Back to site
                </a>
                <ThemeToggle />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.32 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pepdf-primary/10 dark:bg-pepdf-primary/20 text-pepdf-primary text-sm font-semibold mb-6 border border-pepdf-primary/20">
                  {content.eyebrow}
                </div>

                <h1 className="text-4xl md:text-6xl font-display font-bold text-pepdf-purple-dark dark:text-white leading-[1.02] max-w-2xl mb-5">
                  {content.title}
                </h1>

                <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
                  {content.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mt-8 mb-8 relative">
            {statusItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 + index * 0.08 }}
                  className="rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-4"
                >
                  <Icon className="w-5 h-5 text-pepdf-primary mb-3" />
                  <p className="text-sm font-semibold text-pepdf-purple-dark dark:text-white">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${mode}-insights`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-[1.05fr_0.95fr] gap-4 relative"
            >
              <div className="rounded-[1.75rem] bg-pepdf-midnight text-white p-5 md:p-6 relative overflow-hidden border border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,158,178,0.2),_transparent_48%),radial-gradient(circle_at_bottom_right,_rgba(82,40,204,0.18),_transparent_46%)]" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-pepdf-blue-light/80 mb-2">
                        Workspace value
                      </p>
                      <h3 className="text-2xl font-display font-bold text-white">
                        {content.snapshotTitle}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center">
                      {mode === 'login' ? (
                        <LockKeyhole className="w-5 h-5 text-pepdf-blue-light" />
                      ) : (
                        <UserPlus className="w-5 h-5 text-pepdf-blue-light" />
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-sm">
                    {content.snapshotDescription}
                  </p>

                  <div className="space-y-3">
                    {content.snapshotItems.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                        className="rounded-2xl bg-white/6 border border-white/8 px-4 py-4 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <BadgeCheck className="w-4 h-4 text-pepdf-blue-light" />
                          <span className="text-sm text-white/70">{item.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-white text-right">{item.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {content.features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: 0.12 + index * 0.06 }}
                    className="rounded-2xl bg-white/72 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 px-4 py-4"
                  >
                    <p className="font-semibold text-pepdf-purple-dark dark:text-white mb-1.5">
                      {feature.title}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="glass-card rounded-[2rem] bg-white/72 dark:bg-pepdf-midnight/70 p-5 md:p-7 lg:p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(82,40,204,0.11),_transparent_34%)] pointer-events-none" />

          <div className="relative flex items-center justify-between gap-4 mb-8">
            <div className="relative grid grid-cols-2 rounded-full p-1 bg-slate-100/90 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl overflow-hidden min-w-[14rem]">
              <motion.div
                className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full border border-white/40 dark:border-white/10 bg-white/95 dark:bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_24px_rgba(82,40,204,0.18)] backdrop-blur-2xl"
                animate={{ x: mode === 'login' ? '0%' : '100%' }}
                transition={{ type: 'spring', stiffness: 340, damping: 32, mass: 0.7 }}
              />
              <button
                type="button"
                onClick={() => handleModeChange('login')}
                className={`relative z-10 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  mode === 'login'
                    ? 'text-pepdf-primary'
                    : 'text-slate-500 dark:text-slate-400 hover:text-pepdf-primary'
                }`}
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('register')}
                className={`relative z-10 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  mode === 'register'
                    ? 'text-pepdf-primary'
                    : 'text-slate-500 dark:text-slate-400 hover:text-pepdf-primary'
                }`}
              >
                Register
              </button>
            </div>

            <span className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
              Auth flow
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
              className="relative"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-2">
                  {content.formTitle}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                  {content.formSubtitle}
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit} ref={formRef}>
                {content.fields.map((field) => (
                  <label key={field.name} className="block">
                    <span className="auth-label">{field.label}</span>
                    <input
                      className="auth-input"
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required
                    />
                  </label>
                ))}

                <div className="flex items-start justify-between gap-4 text-sm">
                  <label className="inline-flex items-center gap-3 text-slate-500 dark:text-slate-400 cursor-pointer max-w-[17rem]">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-pepdf-primary focus:ring-pepdf-primary"
                    />
                    <span>{content.helperLabel}</span>
                  </label>
                  <a href={content.helperActionHref} className="text-pepdf-primary hover:text-pepdf-blue-light transition-colors whitespace-nowrap">
                    {content.helperActionLabel}
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary justify-center py-3.5 rounded-2xl text-base disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <AuthLoader className="w-10 h-10 -my-3" />
                      {mode === 'login' ? 'Verifying session' : 'Preparing workspace'}
                    </>
                  ) : (
                    <>
                      {content.submitLabel}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-2xl bg-red-500/10 border border-red-500/20 px-4 py-4 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-700 dark:text-red-400">
                          Authentication failed
                        </p>
                        <p className="text-sm text-red-700/80 dark:text-red-300/80 leading-relaxed">
                          {error}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                  {hasSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-4 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <div>
                        <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                          {content.successTitle}
                        </p>
                        <p className="text-sm text-emerald-700/80 dark:text-emerald-300/80 leading-relaxed">
                          {content.successText}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {content.switchPrompt}{' '}
                  <button
                    type="button"
                    onClick={() => handleModeChange(mode === 'login' ? 'register' : 'login')}
                    className="text-pepdf-primary hover:text-pepdf-blue-light transition-colors font-semibold"
                  >
                    {content.switchLabel}
                  </button>
                </p>

                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                  {mode === 'login' ? <Clock3 className="w-3.5 h-3.5" /> : <Workflow className="w-3.5 h-3.5" />}
                  {content.helperText}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
