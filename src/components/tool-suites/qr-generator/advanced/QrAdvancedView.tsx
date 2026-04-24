import { useMemo, useState } from 'react';
import { SlidersHorizontal, UploadCloud } from 'lucide-react';
import QrLocalNav from '../shared/QrLocalNav';

const correctionLevels = ['L', 'M', 'Q', 'H'];

export default function QrAdvancedView() {
  const [data, setData] = useState('https://www.google.com');
  const [correction, setCorrection] = useState('H');
  const [logoShape, setLogoShape] = useState<'circular' | 'rounded'>('circular');
  const [logoSize, setLogoSize] = useState(30);
  const [whiteMargin, setWhiteMargin] = useState(3);
  const [logoName, setLogoName] = useState('');
  const [built, setBuilt] = useState(false);

  const readiness = useMemo(() => {
    if (!data.trim()) return 'Missing QR content';
    if (logoName) return 'Ready with logo';
    return 'Ready without logo';
  }, [data, logoName]);

  return (
    <>
      <QrLocalNav current="advanced" />

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 glass-card bg-white/70 dark:bg-white/5 rounded-3xl p-7 border border-slate-200/80 dark:border-white/10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-3">
              Advanced QR Studio
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-7">
              Notebook-inspired controls for logo, correction level, and scan-safe composition.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="auth-label">QR Data</label>
                <input
                  value={data}
                  onChange={(event) => setData(event.target.value)}
                  className="auth-input"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="auth-label">Error Correction</label>
                <select value={correction} onChange={(event) => setCorrection(event.target.value)} className="auth-input">
                  {correctionLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="auth-label">Logo Shape</label>
                <select
                  value={logoShape}
                  onChange={(event) => setLogoShape(event.target.value as 'circular' | 'rounded')}
                  className="auth-input"
                >
                  <option value="circular">Circular</option>
                  <option value="rounded">Rounded</option>
                </select>
              </div>

              <div>
                <label className="auth-label">Logo Size: {logoSize}%</label>
                <input
                  type="range"
                  min={10}
                  max={30}
                  step={1}
                  value={logoSize}
                  onChange={(event) => setLogoSize(Number(event.target.value))}
                  className="w-full accent-pepdf-primary"
                />
              </div>

              <div>
                <label className="auth-label">White Margin: {whiteMargin}</label>
                <input
                  type="range"
                  min={0}
                  max={3}
                  step={1}
                  value={whiteMargin}
                  onChange={(event) => setWhiteMargin(Number(event.target.value))}
                  className="w-full accent-pepdf-primary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="auth-label">Optional Logo</label>
                <label className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 dark:border-white/15 bg-white/70 dark:bg-black/20 px-4 py-3 cursor-pointer hover:border-pepdf-primary/50 transition-colors">
                  <UploadCloud className="w-5 h-5 text-pepdf-primary" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {logoName || 'Select PNG or SVG file'}
                  </span>
                  <input
                    type="file"
                    accept=".png,.svg,image/png,image/svg+xml"
                    className="hidden"
                    onChange={(event) => setLogoName(event.target.files?.[0]?.name ?? '')}
                  />
                </label>
              </div>
            </div>

            <div className="pt-7 flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={() => setBuilt(true)} disabled={!data.trim()}>
                <SlidersHorizontal className="w-4 h-4" />
                Build Preview
              </button>
              <button type="button" className="btn-secondary" onClick={() => setBuilt(false)}>
                Reset Preview
              </button>
            </div>
          </div>

          <aside className="glass-card bg-white/70 dark:bg-white/5 rounded-3xl p-7 border border-slate-200/80 dark:border-white/10">
            <h2 className="text-xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-4">Output Panel</h2>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/75 dark:bg-black/20 p-4 space-y-3">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Status: {readiness}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Correction: {correction}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Shape: {logoShape}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Logo size: {logoSize}%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">White margin: {whiteMargin}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 dark:border-white/15 min-h-[220px] bg-white/80 dark:bg-black/20 flex items-center justify-center p-4 text-center">
              {built ? (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Preview placeholder rendered.
                  <br />
                  Next step is wiring this with real QR generation logic.
                </p>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">Build Preview to see notebook-like output simulation.</p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
