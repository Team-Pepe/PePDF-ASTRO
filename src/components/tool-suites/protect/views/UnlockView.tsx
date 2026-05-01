import { useState } from 'react';
import { KeyRound, UploadCloud } from 'lucide-react';
import ProtectLocalNav from '../shared/ProtectLocalNav';
import { unlockPdf } from '../../../../services/protect';

export default function UnlockView() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setResultUrl(null);
  };

  const handleUnlock = async () => {
    if (!file) return alert('Please select a PDF file');
    if (!password) return alert('Please provide the PDF password');

    setLoading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('password', password);

      const blob = await unlockPdf(form);
      const url = URL.createObjectURL(blob);
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } catch (err) {
      console.error(err);
      alert('Failed to unlock PDF. Check password and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ProtectLocalNav current="unlock" />

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 glass-card bg-white/70 dark:bg-white/5 rounded-3xl p-7 border border-slate-200/80 dark:border-white/10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-3">
              Unlock Access
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-7">
              Remove opening passwords (when you own the rights) to create an editable copy.
            </p>

            <div className="space-y-5">
              <div>
                <label className="auth-label">Protected PDF</label>
                <label className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 dark:border-white/15 bg-white/70 dark:bg-black/20 px-4 py-3 cursor-pointer hover:border-pepdf-primary/50 transition-colors">
                  <UploadCloud className="w-5 h-5 text-pepdf-primary" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {file?.name || 'Select PDF file'}
                  </span>
                  <input type="file" accept="application/pdf" onChange={handleFile} className="hidden" />
                </label>
              </div>

              <div>
                <label className="auth-label">Current Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Current password" className="auth-input" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" className="btn-primary" onClick={handleUnlock} disabled={!file || !password || loading}>
                  <KeyRound className="w-4 h-4" />
                  {loading ? 'Unlocking...' : 'Unlock PDF'}
                </button>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2 glass-card bg-white/70 dark:bg-white/5 rounded-3xl p-7 border border-slate-200/80 dark:border-white/10">
            <h2 className="text-xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-4">Output</h2>

            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-white/15 min-h-[200px] flex flex-col items-center justify-center p-4 bg-white/70 dark:bg-black/20">
              {resultUrl ? (
                <div className="w-full flex flex-col items-center">
                  <div className="w-full h-[300px] md:h-[400px] mb-4 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white/50">
                    <iframe src={resultUrl} className="w-full h-full" title="PDF Preview" />
                  </div>
                  <p className="mb-3 font-medium text-slate-700 dark:text-slate-200">Unlocked PDF ready</p>
                  <a href={resultUrl} download={`unlocked_${file?.name ?? 'file.pdf'}`} className="text-sm font-semibold text-pepdf-primary hover:underline">
                    Download Unlocked PDF
                  </a>
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-[16rem]">
                  Upload a protected PDF and provide the current password to create an unlocked copy.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
