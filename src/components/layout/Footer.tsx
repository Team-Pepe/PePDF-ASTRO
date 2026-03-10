import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com', icon: Github },
    { label: 'Twitter', href: 'https://x.com', icon: Twitter },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { label: 'Email', href: '/contact', icon: Mail },
  ];

  const productLinks = [
    { label: 'PDF Tools', href: '/pdf-tools' },
    { label: 'QR Generator', href: '/qr-generator' },
    { label: 'Convert', href: '/convert' },
    { label: 'Protect', href: '/protect' },
  ];

  const resourceLinks = [
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api-reference' },
    { label: 'Security Whitepaper', href: '/security' },
    { label: 'Help Center', href: '/help-center' },
    { label: 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <footer className="py-20 px-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-pepdf-black/50 transition-colors">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pepdf-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-pepdf-primary/40">
              P
            </div>
            <span className="text-xl font-display font-bold text-pepdf-purple-dark dark:text-white">
              PePDF
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
            Empowering users with intuitive, secure, and lightning-fast digital tools. Simplify your document workflow today.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="p-2 rounded-xl bg-slate-200 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-pepdf-primary dark:hover:text-pepdf-primary hover:bg-pepdf-primary/10 transition-all duration-300"
                >
                <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-pepdf-purple-dark dark:text-white mb-6 uppercase text-xs tracking-widest">Products</h4>
          <ul className="flex flex-col gap-4 text-slate-500 dark:text-slate-400 text-sm">
            {productLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-pepdf-primary transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-pepdf-purple-dark dark:text-white mb-6 uppercase text-xs tracking-widest">Resources</h4>
          <ul className="flex flex-col gap-4 text-slate-500 dark:text-slate-400 text-sm">
            {resourceLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-pepdf-primary transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-pepdf-purple-dark dark:text-white mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Subscribe for the latest tool updates and security news.</p>
          <div className="relative group">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pepdf-primary focus:border-transparent outline-none transition-all dark:text-white"
            />
            <button className="absolute right-1 top-1 bottom-1 px-4 bg-pepdf-primary text-white text-xs font-bold rounded-lg hover:bg-pepdf-primary/90 transition-all">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-slate-200 dark:border-white/5">
        <p className="text-slate-400 dark:text-slate-500 text-sm flex items-center gap-2">
          © {new Date().getFullYear()} PePDF Platform. Made with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> by PePDF Team.
        </p>
        <div className="flex items-center gap-8 text-slate-400 dark:text-slate-500 text-sm">
          <a href="/privacy" className="hover:text-pepdf-primary transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-pepdf-primary transition-colors">Terms</a>
          <a href="/cookies" className="hover:text-pepdf-primary transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}