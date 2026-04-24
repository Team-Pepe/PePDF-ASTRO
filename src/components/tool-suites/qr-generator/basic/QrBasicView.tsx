import { useState } from 'react';
import { Link2, MessageSquare, QrCode } from 'lucide-react';
import QrLocalNav from '../shared/QrLocalNav';

export default function QrBasicView() {
  const [mode, setMode] = useState<'text' | 'link'>('text');
  const [payload, setPayload] = useState('');
  const [size, setSize] = useState('512');
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <QrLocalNav current="basic" />

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 glass-card bg-white/70 dark:bg-white/5 rounded-3xl p-7 border border-slate-200/80 dark:border-white/10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-3">
              Basic QR Generator
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-7">
              Quick setup to generate QR from plain text or links. This view is focused for speed.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <button
                type="button"
                onClick={() => setMode('text')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all inline-flex items-center gap-2 ${
                  mode === 'text'
                    ? 'bg-pepdf-primary text-white'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Text
              </button>
              <button
                type="button"
                onClick={() => setMode('link')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all inline-flex items-center gap-2 ${
                  mode === 'link'
                    ? 'bg-pepdf-primary text-white'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Link2 className="w-4 h-4" />
                Link
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="auth-label">QR Content</label>
                <textarea
                  rows={4}
                  value={payload}
                  onChange={(event) => setPayload(event.target.value)}
                  placeholder={mode === 'text' ? 'Write your message or short note' : 'https://your-link.com'}
                  className="auth-input resize-none"
                />
              </div>

              <div>
                <label className="auth-label">Output Size</label>
                <select value={size} onChange={(event) => setSize(event.target.value)} className="auth-input">
                  <option value="256">256 x 256</option>
                  <option value="512">512 x 512</option>
                  <option value="1024">1024 x 1024</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setShowPreview(true)}
                  disabled={!payload.trim()}
                >
                  <QrCode className="w-4 h-4" />
                  Generate Preview
                </button>
                <button type="button" className="btn-secondary" onClick={() => setPayload('')}>
                  Clear
                </button>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2 glass-card bg-white/70 dark:bg-white/5 rounded-3xl p-7 border border-slate-200/80 dark:border-white/10">
            <h2 className="text-xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-4">Preview</h2>

            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-white/15 min-h-[280px] flex items-center justify-center p-4 bg-white/70 dark:bg-black/20">
              {showPreview ? (
                <div className="text-center">
                  <div className="w-28 h-28 rounded-xl bg-slate-200 dark:bg-white/10 mx-auto mb-4 flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-pepdf-primary" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">QR Placeholder ({size})</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Mode: {mode === 'text' ? 'Text' : 'Link'}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-[16rem]">
                  Fill content and click Generate Preview to render the future QR result here.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
