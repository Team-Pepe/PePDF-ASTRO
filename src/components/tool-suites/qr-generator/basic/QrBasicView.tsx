import { useState } from 'react';
import { MessageSquare, QrCode } from 'lucide-react';
import QrLocalNav from '../shared/QrLocalNav';

export default function QrBasicView() {
  const [payload, setPayload] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generatePreview = async () => {
    if (!payload.trim()) return;
    
    setLoading(true);
    try {
      const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/tool-suites/qr-generator/basic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: payload,
          size: 1024,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate QR');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setQrImageUrl(prev => {
        if (prev) URL.revokeObjectURL(prev);
        return imageUrl;
      });
    } catch (error) {
      console.error('Error generating QR:', error);
      alert('Error generating QR code. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPayload('');
    setQrImageUrl(null);
  };

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

            <div className="space-y-5">
              <div>
                <label className="auth-label">QR Content</label>
                <textarea
                  rows={4}
                  value={payload}
                  onChange={(event) => setPayload(event.target.value)}
                  placeholder="Write your message, short note or link"
                  className="auth-input resize-none"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={generatePreview}
                  disabled={!payload.trim() || loading}
                >
                  <QrCode className="w-4 h-4" />
                  {loading ? 'Generating...' : 'Generate QR'}
                </button>
                <button type="button" className="btn-secondary" onClick={handleClear}>
                  Clear
                </button>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2 glass-card bg-white/70 dark:bg-white/5 rounded-3xl p-7 border border-slate-200/80 dark:border-white/10">
            <h2 className="text-xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-4">Output</h2>

            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-white/15 min-h-[280px] flex flex-col items-center justify-center p-4 bg-white/70 dark:bg-black/20">
              {qrImageUrl ? (
                <div className="text-center w-full">
                  <img src={qrImageUrl} alt="Generated QR Code" className="max-w-full h-auto mx-auto rounded-lg shadow-sm mb-4" style={{maxHeight: '300px'}} />
                  <a 
                    href={qrImageUrl} 
                    download="qrcode.png" 
                    className="text-sm font-semibold text-pepdf-primary hover:underline"
                  >
                    Download PNG
                  </a>
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-[16rem]">
                  Fill content and click Generate QR to render the result here.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
