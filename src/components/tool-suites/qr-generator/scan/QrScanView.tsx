import { useEffect, useRef, useState } from 'react';
import { Camera, CheckCircle2, ImageUp, ScanLine, XCircle } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import QrLocalNav from '../shared/QrLocalNav';

export default function QrScanView() {
  const [source, setSource] = useState<'upload' | 'camera'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [decodedValue, setDecodedValue] = useState('');
  const [scanStatus, setScanStatus] = useState<'idle' | 'done' | 'error' | 'scanning'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Camera scanner state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Clean up camera on unmount or source change
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [source]);

  const stopCamera = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error("Error stopping camera", err);
      }
    }
    setIsCameraActive(false);
  };

  const startCamera = async () => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("qr-reader");
    }

    try {
      setScanStatus('scanning');
      setDecodedValue('');
      setIsCameraActive(true);
      
      await scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          // Success callback
          setDecodedValue(decodedText);
          setScanStatus('done');
          stopCamera();
        },
        () => {
          // Progress/failure callback - ignore to avoid spamming console
        }
      );
    } catch (err) {
      console.error("Error starting camera", err);
      setScanStatus('error');
      setErrorMessage('Could not access camera. Please check permissions.');
      setIsCameraActive(false);
    }
  };

  const scanFile = async () => {
    if (!file) return;
    
    setScanStatus('scanning');
    setDecodedValue('');
    setErrorMessage('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/tool-suites/qr-generator/scan`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to decode QR code');
      }

      const result = await response.json();
      setDecodedValue(result.decoded_value);
      setScanStatus('done');
    } catch (error) {
      console.error('Error scanning file:', error);
      setScanStatus('error');
      setErrorMessage('Could not find or decode a QR code in the provided image.');
    }
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
                Upload Image
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
                Use Camera
              </button>
            </div>

            {source === 'upload' ? (
              <div className="space-y-4">
                <label className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 dark:border-white/15 bg-white/70 dark:bg-black/20 px-4 py-4 cursor-pointer hover:border-pepdf-primary/50 transition-colors">
                  <ImageUp className="w-5 h-5 text-pepdf-primary" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {file?.name || 'Select image with QR code'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                  />
                </label>
                
                <div className="pt-2 flex gap-3">
                  <button 
                    type="button" 
                    className="btn-primary" 
                    onClick={scanFile}
                    disabled={!file || scanStatus === 'scanning'}
                  >
                    <ScanLine className="w-4 h-4" />
                    {scanStatus === 'scanning' ? 'Scanning...' : 'Scan Image'}
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setDecodedValue('');
                      setScanStatus('idle');
                      setFile(null);
                    }}
                  >
                    Clear Result
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl border border-dashed border-slate-300 dark:border-white/15 bg-white/70 dark:bg-black/20 p-2 overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                  <div id="qr-reader" className="w-full max-w-sm rounded-lg overflow-hidden"></div>
                  {!isCameraActive && (
                    <div className="text-center p-6 text-sm text-slate-600 dark:text-slate-300">
                      Camera stream is inactive.
                    </div>
                  )}
                </div>
                
                <div className="pt-2 flex gap-3">
                  {!isCameraActive ? (
                    <button type="button" className="btn-primary" onClick={startCamera}>
                      <Camera className="w-4 h-4" />
                      Start Camera
                    </button>
                  ) : (
                    <button type="button" className="btn-secondary text-red-600 dark:text-red-400" onClick={stopCamera}>
                      Stop Camera
                    </button>
                  )}
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
            )}
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
                  <div className="p-3 bg-white dark:bg-black/40 rounded-xl border border-slate-200 dark:border-white/5">
                    <p className="text-sm text-slate-700 dark:text-slate-200 break-all select-all font-mono">
                      {decodedValue}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(decodedValue)}
                    className="text-xs font-semibold text-pepdf-primary hover:underline"
                  >
                    Copy to clipboard
                  </button>
                </div>
              ) : scanStatus === 'error' ? (
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-red-500">
                    <XCircle className="w-4 h-4" />
                    Scan Failed
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{errorMessage}</p>
                </div>
              ) : scanStatus === 'scanning' ? (
                <p className="text-sm text-slate-500 dark:text-slate-400 animate-pulse">Scanning in progress...</p>
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
