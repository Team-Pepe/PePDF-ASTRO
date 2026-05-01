type ProtectView = 'encrypt' | 'permissions' | 'unlock';

interface ProtectLocalNavProps {
  current: ProtectView;
}

const links: Array<{ key: ProtectView; label: string; href: string }> = [
  { key: 'encrypt', label: 'Encrypt PDF', href: '/protect/encrypt' },
  { key: 'permissions', label: 'Permission Controls', href: '/protect/permissions' },
  { key: 'unlock', label: 'Unlock Access', href: '/protect/unlock' },
];

export default function ProtectLocalNav({ current }: ProtectLocalNavProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-36 pb-6">
      <a href="/protect" className="inline-flex text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-pepdf-primary transition-colors">
        Back to Protect Hub
      </a>

      <div className="mt-4 p-2 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 inline-flex gap-2 flex-wrap">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              link.key === current
                ? 'bg-pepdf-primary text-white shadow-lg shadow-pepdf-primary/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-pepdf-primary hover:bg-pepdf-primary/10'
            }`}
            aria-current={link.key === current ? 'page' : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
