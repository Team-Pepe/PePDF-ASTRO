import { useState } from 'react';
import { Shield, UploadCloud } from 'lucide-react';
import ProtectLocalNav from '../shared/ProtectLocalNav';
import { setPermissions } from '../../../../services/protect';

export default function PermissionsView() {
  const [file, setFile] = useState<File | null>(null);
  const [allowPrint, setAllowPrint] = useState(true);
  const [allowModify, setAllowModify] = useState(false);
  const [allowCopy, setAllowCopy] = useState(false);
  const [allowAnnotate, setAllowAnnotate] = useState(false);
  const [ownerPassword, setOwnerPassword] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setResultUrl(null);
  };

  const handleApply = async () => {
    if (!file) return alert('Please select a PDF file');
    if (!ownerPassword) return alert('Owner password is required');

    setLoading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('owner_password', ownerPassword);
      form.append('user_password', userPassword);
      form.append('allow_print', String(allowPrint));
      form.append('allow_modify', String(allowModify));
      form.append('allow_copy', String(allowCopy));
      form.append('allow_annotate', String(allowAnnotate));

      const blob = await setPermissions(form);
      const url = URL.createObjectURL(blob);
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } catch (err) {
      console.error(err);
      alert('Failed to apply permissions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ProtectLocalNav current="permissions" />

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 glass-card bg-white/70 dark:bg-white/5 rounded-3xl p-7 border border-slate-200/80 dark:border-white/10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-3">
              Permission Controls
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-7">
              Choose what recipients can do: print, edit, copy content, or annotate.
            </p>

            <div className="space-y-5">
              <div>
                <label className="auth-label">PDF File</label>
                <label className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 dark:border-white/15 bg-white/70 dark:bg-black/20 px-4 py-3 cursor-pointer hover:border-pepdf-primary/50 transition-colors">
                  <UploadCloud className="w-5 h-5 text-pepdf-primary" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {file?.name || 'Select PDF file'}
                  </span>
                  <input type="file" accept="application/pdf" onChange={handleFile} className="hidden" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={allowPrint} onChange={() => setAllowPrint((s) => !s)} />
                  <span>Allow Print</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={allowModify} onChange={() => setAllowModify((s) => !s)} />
                  <span>Allow Modify</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={allowCopy} onChange={() => setAllowCopy((s) => !s)} />
                  <span>Allow Copy/Extract</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={allowAnnotate} onChange={() => setAllowAnnotate((s) => !s)} />
                  <span>Allow Annotate</span>
                </label>
              </div>

              <div>
                <label className="auth-label">Owner Password (required)</label>
                <input value={ownerPassword} onChange={(e) => setOwnerPassword(e.target.value)} placeholder="Owner password" className="auth-input" />
              </div>

              <div>
                <label className="auth-label">Optional Open Password</label>
                <input value={userPassword} onChange={(e) => setUserPassword(e.target.value)} placeholder="User/open password (leave blank for open)" className="auth-input" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" className="btn-primary" onClick={handleApply} disabled={!file || loading}>
                  <Shield className="w-4 h-4" />
                  {loading ? 'Applying...' : 'Apply Permissions'}
                </button>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2 glass-card bg-white/70 dark:bg-white/5 rounded-3xl p-7 border border-slate-200/80 dark:border-white/10">
            <h2 className="text-xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-4">Output</h2>

            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-white/15 min-h-[200px] flex flex-col items-center justify-center p-4 bg-white/70 dark:bg-black/20">
              {resultUrl ? (
                <div className="text-center w-full">
                  <p className="mb-4">Permissions applied</p>
                  <a href={resultUrl} download={`perms_${file?.name ?? 'file.pdf'}`} className="text-sm font-semibold text-pepdf-primary hover:underline">
                    Download PDF with permissions
                  </a>
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-[16rem]">
                  Configure permissions and apply them to generate a protected output.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
