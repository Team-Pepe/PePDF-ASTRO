import { useMemo, useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, UploadCloud, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QrLocalNav from '../shared/QrLocalNav';

const correctionLevels = [
  { value: 'L', label: 'Low (7%)' },
  { value: 'M', label: 'Medium (15%)' },
  { value: 'Q', label: 'High (25%)' },
  { value: 'H', label: 'Maximum (30%) - Logo Recommended' },
];

const shapeOptions = [
  { value: 'circular', label: 'Circular' },
  { value: 'rounded', label: 'Rounded' },
];

// Custom Select Component
function CustomSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="auth-label">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="auth-input flex items-center justify-between w-full text-left"
      >
        <span className="block truncate">{selectedOption.label}</span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 w-full mt-2 bg-white dark:bg-[#231123] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl"
          >
            <ul className="py-2">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-pepdf-primary/10 hover:text-pepdf-primary transition-colors flex items-center justify-between
                      ${
                        value === option.value
                          ? 'text-pepdf-primary bg-pepdf-primary/5 font-medium'
                          : 'text-slate-700 dark:text-slate-300'
                      }
                    `}
                  >
                    <span className="truncate">{option.label}</span>
                    {value === option.value && <Check className="w-4 h-4" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function QrAdvancedView() {
  const [data, setData] = useState('https://www.example.com');
  const [correction, setCorrection] = useState('H');
  const [logoShape, setLogoShape] = useState<'circular' | 'rounded'>('circular');
  const [logoSize, setLogoSize] = useState(30);
  const [whiteMargin, setWhiteMargin] = useState(3);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const readiness = useMemo(() => {
    if (!data.trim()) return 'Missing QR content';
    if (logoFile) return 'Ready with logo';
    return 'Ready without logo';
  }, [data, logoFile]);

  const generateAdvancedQr = async () => {
    if (!data.trim()) return;
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('data', data);
      formData.append('error_correction', correction);
      formData.append('logo_shape', logoShape);
      formData.append('logo_size_percent', logoSize.toString());
      formData.append('white_margin', whiteMargin.toString());
      
      if (logoFile) {
        formData.append('logo', logoFile);
      }

      const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/tool-suites/qr-generator/advanced`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate advanced QR');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setQrImageUrl(prev => {
        if (prev) URL.revokeObjectURL(prev);
        return imageUrl;
      });
    } catch (error) {
      console.error('Error generating advanced QR:', error);
      alert('Error generating QR code. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQrImageUrl(null);
  };

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
                <CustomSelect
                  label="Error Correction"
                  value={correction}
                  onChange={setCorrection}
                  options={correctionLevels}
                />
              </div>

              <div>
                <CustomSelect
                  label="Logo Shape"
                  value={logoShape}
                  onChange={(val) => setLogoShape(val as 'circular' | 'rounded')}
                  options={shapeOptions}
                />
              </div>

              <div>
                <label className="auth-label flex justify-between">
                  <span>Logo Size</span>
                  <span className="text-pepdf-primary">{logoSize}%</span>
                </label>
                <div className="auth-input h-[52px] flex items-center">
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
              </div>

              <div>
                <label className="auth-label flex justify-between">
                  <span>White Margin</span>
                  <span className="text-pepdf-primary">{whiteMargin}</span>
                </label>
                <div className="auth-input h-[52px] flex items-center">
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
              </div>

              <div className="md:col-span-2">
                <label className="auth-label">Optional Logo</label>
                <label className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 dark:border-white/15 bg-white/70 dark:bg-black/20 px-4 py-3 cursor-pointer hover:border-pepdf-primary/50 transition-colors">
                  <UploadCloud className="w-5 h-5 text-pepdf-primary" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {logoFile?.name || 'Select PNG or SVG file'}
                  </span>
                  <input
                    type="file"
                    accept=".png,.svg,image/png,image/svg+xml"
                    className="hidden"
                    onChange={(event) => setLogoFile(event.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
            </div>

            <div className="pt-7 flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={generateAdvancedQr} disabled={!data.trim() || loading}>
                <SlidersHorizontal className="w-4 h-4" />
                {loading ? 'Building...' : 'Build QR'}
              </button>
              <button type="button" className="btn-secondary" onClick={handleReset}>
                Reset Output
              </button>
            </div>
          </div>

          <aside className="glass-card bg-white/70 dark:bg-white/5 rounded-3xl p-7 border border-slate-200/80 dark:border-white/10">
            <h2 className="text-xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-4">Output Panel</h2>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/75 dark:bg-black/20 p-4 space-y-3">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Status: {readiness}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Correction: {correctionLevels.find(l => l.value === correction)?.label}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Shape: {shapeOptions.find(s => s.value === logoShape)?.label}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Logo size: {logoSize}%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">White margin: {whiteMargin}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 dark:border-white/15 min-h-[220px] bg-white/80 dark:bg-black/20 flex flex-col items-center justify-center p-4 text-center">
              {qrImageUrl ? (
                <>
                  <img src={qrImageUrl} alt="Advanced QR Code" className="max-w-full h-auto rounded-lg shadow-sm mb-4" style={{maxHeight: '250px'}} />
                  <a 
                    href={qrImageUrl} 
                    download="advanced_qrcode.png" 
                    className="text-sm font-semibold text-pepdf-primary hover:underline"
                  >
                    Download PNG
                  </a>
                </>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">Build QR to see notebook-like output simulation.</p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
