type QrView = 'basic' | 'advanced' | 'scan';

interface QrLocalNavProps {
  current: QrView;
}

const links: Array<{ key: QrView; label: string; href: string }> = [
  { key: 'basic', label: 'Basic Generator', href: '/qr-generator/basic' },
  { key: 'advanced', label: 'Advanced Studio', href: '/qr-generator/advanced' },
  { key: 'scan', label: 'Scan Station', href: '/qr-generator/scan' },
];

export default function QrLocalNav({ current }: QrLocalNavProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-36 pb-6">
      <a href="/qr-generator" className="inline-flex text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-pepdf-primary transition-colors">
        Back to QR Hub
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
