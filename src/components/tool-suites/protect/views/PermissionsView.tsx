import { useState } from 'react';
import { Shield, UploadCloud } from 'lucide-react';
import ProtectLocalNav from '../shared/ProtectLocalNav';
import { setPermissions } from '../../../../services/protect';

const Toggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (val: boolean) => void }) => (
  <label className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/10 cursor-pointer hover:border-pepdf-primary/30 transition-colors">
    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
    <div className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-pepdf-primary' : 'bg-slate-300 dark:bg-slate-600'}`}>
      <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </div>
    <input type="checkbox" className="hidden" checked={checked} onChange={(e) => onChange(e.target.checked)} />
  </label>
);

export default function PermissionsView() {
  const [file, setFile] = useState<File | null>(null);
  const [blockPrint, setBlockPrint] = useState(false);
  const [blockPrintHighRes, setBlockPrintHighRes] = useState(false);
  const [blockModify, setBlockModify] = useState(false);
  const [blockCopy, setBlockCopy] = useState(false);
  const [blockAnnotate, setBlockAnnotate] = useState(false);
  const [blockFillForms, setBlockFillForms] = useState(false);
  const [blockAssemble, setBlockAssemble] = useState(false);
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
      form.append('block_print', String(blockPrint));
      form.append('block_print_high_res', String(blockPrintHighRes));
      form.append('block_modify', String(blockModify));
      form.append('block_copy', String(blockCopy));
      form.append('block_annotate', String(blockAnnotate));
      form.append('block_fill_forms', String(blockFillForms));
      form.append('block_assemble', String(blockAssemble));

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Toggle label="Block Print" checked={blockPrint} onChange={setBlockPrint} />
                <Toggle label="Block High-Res Print" checked={blockPrintHighRes} onChange={setBlockPrintHighRes} />
                <Toggle label="Block Modify" checked={blockModify} onChange={setBlockModify} />
                <Toggle label="Block Copy/Extract" checked={blockCopy} onChange={setBlockCopy} />
                <Toggle label="Block Annotate" checked={blockAnnotate} onChange={setBlockAnnotate} />
                <Toggle label="Block Fill Forms" checked={blockFillForms} onChange={setBlockFillForms} />
                <Toggle label="Block Assemble Doc" checked={blockAssemble} onChange={setBlockAssemble} />
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
