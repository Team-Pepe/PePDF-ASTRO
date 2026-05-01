import { useMemo, useState, type ChangeEvent } from 'react';
import { Download, Loader2, UploadCloud, X } from 'lucide-react';
import { convertToolsService } from '../../../../services/convertTools';

const ACCEPTED_TYPES = ['application/pdf'];

export default function PdfToWordUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const selectedCount = useMemo(() => (file ? 1 : 0), [file]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []);
    const [first] = selected.filter((item) => ACCEPTED_TYPES.includes(item.type) || item.name.toLowerCase().endsWith('.pdf'));

    if (!first) {
      setError('Please select a valid PDF file.');
      return;
    }

    setError(null);
    setFile(first);

    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleConvert = async () => {
    if (!file) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const docxBlob = await convertToolsService.pdfToWord(file);
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
      setDownloadUrl(URL.createObjectURL(docxBlob));
    } catch (err: any) {
      setError(err?.message || 'Conversion failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pb-10 px-6">
      <div className="max-w-6xl mx-auto glass-card bg-white/60 dark:bg-white/5 rounded-3xl p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-2">
              PDF to Word Converter
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
              Upload a PDF and convert it to DOCX using LibreOffice running inside Docker.
            </p>
          </div>
          <label className="btn-primary cursor-pointer inline-flex items-center gap-2">
            <UploadCloud className="w-4 h-4" />
            Select PDF
            <input
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={onFileChange}
            />
          </label>
        </div>

        <div className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          Selected files: <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedCount}</span>
        </div>

        {file && (
          <div className="mb-8 rounded-xl border border-slate-200 dark:border-white/10 px-4 py-3 flex items-center justify-between bg-white/70 dark:bg-white/5">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{file.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{Math.ceil(file.size / 1024)} KB</p>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-slate-500 hover:text-red-500 transition-colors"
              aria-label={`Remove ${file.name}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="button" className="btn-primary" disabled={isSubmitting || !file} onClick={handleConvert}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
            {isSubmitting ? 'Converting...' : 'Convert to Word'}
          </button>

          {downloadUrl && (
            <a href={downloadUrl} download="converted.docx" className="btn-primary">
              <Download className="w-4 h-4" />
              Download DOCX
            </a>
          )}
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      </div>
    </section>
  );
}
