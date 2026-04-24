import { useState } from 'react';
import { Camera, CheckCircle2, ImageUp, ScanLine } from 'lucide-react';
import QrLocalNav from '../shared/QrLocalNav';

export default function QrScanView() {
  const [source, setSource] = useState<'upload' | 'camera'>('upload');
  const [fileName, setFileName] = useState('');
  const [decodedValue, setDecodedValue] = useState('');
  const [scanStatus, setScanStatus] = useState<'idle' | 'done'>('idle');

  const runMockScan = () => {
    setScanStatus('done');
    setDecodedValue(fileName ? `Decoded from ${fileName}` : 'https://demo.pepdf.app/qr-preview');
  };

  return (
    <>
      <QrLocalNav current="scan" />

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 glass-card bg-white/70 dark:bg-white/5 rounded-3xl p-7 border border-slate-200/80 dark:border-white/10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-3">
              QR Scan Station
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-7">
              Dedicated view to scan and decode QR values from image upload or camera stream.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <button
                type="button"
                onClick={() => setSource('upload')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all inline-flex items-center gap-2 ${
                  source === 'upload'
                    ? 'bg-pepdf-primary text-white'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
                }`}
              >
                <ImageUp className="w-4 h-4" />
                Upload
              </button>
              <button
                type="button"
                onClick={() => setSource('camera')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all inline-flex items-center gap-2 ${
                  source === 'camera'
                    ? 'bg-pepdf-primary text-white'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Camera className="w-4 h-4" />
                Camera
              </button>
            </div>

            {source === 'upload' ? (
              <label className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 dark:border-white/15 bg-white/70 dark:bg-black/20 px-4 py-4 cursor-pointer hover:border-pepdf-primary/50 transition-colors">
                <ImageUp className="w-5 h-5 text-pepdf-primary" />
                <span className="text-sm text-slate-600 dark:text-slate-300">{fileName || 'Select image with QR code'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
                />
              </label>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 dark:border-white/15 bg-white/70 dark:bg-black/20 p-6 text-sm text-slate-600 dark:text-slate-300">
                Camera stream placeholder. In the next step, this panel will be connected to real camera scanning.
              </div>
            )}

            <div className="pt-6 flex gap-3">
              <button type="button" className="btn-primary" onClick={runMockScan}>
                <ScanLine className="w-4 h-4" />
                Simulate Scan
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setDecodedValue('');
                  setScanStatus('idle');
                }}
              >
                Clear Result
              </button>
            </div>
          </div>

          <aside className="glass-card bg-white/70 dark:bg-white/5 rounded-3xl p-7 border border-slate-200/80 dark:border-white/10">
            <h2 className="text-xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-4">Decode Result</h2>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/75 dark:bg-black/20 p-4 min-h-[180px]">
              {scanStatus === 'done' ? (
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    Scan completed
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 break-all">{decodedValue}</p>
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">Run scan to display decoded value.</p>
              )}
            </div>

            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 dark:border-white/15 p-4 text-sm text-slate-500 dark:text-slate-400">
              Recent scans placeholder. History persistence will be added in the logic phase.
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
