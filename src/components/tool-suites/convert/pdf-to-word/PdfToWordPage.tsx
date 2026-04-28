import { FileText, ScanText, Sparkles, ShieldCheck } from 'lucide-react';
import ConversionWorkspace from '../shared/ConversionWorkspace';
import PdfToWordUploader from './PdfToWordUploader';

export default function PdfToWordPage() {
  return (
    <ConversionWorkspace
      badge="Document extraction"
      titleStart="Convert PDFs into"
      titleAccent="Editable Word"
      description="Upload PDF files and convert them into editable DOCX documents through the same LibreOffice containerized pipeline used in production."
      accentColor="#231123"
      backHref="/convert"
      backLabel="Back to convert suite"
      stats={[
        { label: 'Input', value: 'PDF' },
        { label: 'Output', value: 'DOCX' },
        { label: 'Engine', value: 'LibreOffice headless' },
      ]}
      steps={[
        {
          title: 'Select your PDF',
          description: 'Choose a PDF file and keep the conversion focused on one document for better control.',
        },
        {
          title: 'Run conversion',
          description: 'The backend container converts the PDF using LibreOffice and returns a DOCX output.',
        },
        {
          title: 'Download DOCX',
          description: 'Open and edit the generated Word file in your preferred Office-compatible editor.',
        },
      ]}
      relatedHref="/convert/word-to-pdf"
      relatedTitle="Need the opposite direction?"
      relatedDescription="Switch to Word to PDF and export DOC or DOCX files to a clean PDF in the same workspace style."
      relatedCta="Open Word to PDF"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] items-start">
          <div className="space-y-4">
            <PdfToWordUploader />
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-3xl bg-white/70 dark:bg-white/5 p-6 md:p-7 border border-slate-200/70 dark:border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-pepdf-primary text-white flex items-center justify-center shadow-lg shadow-pepdf-primary/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Output style</p>
                  <h3 className="font-semibold text-pepdf-purple-dark dark:text-white">Editable Word output from PDF</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  { icon: ScanText, label: 'Text flow', value: 'Best effort reconstruction of editable text' },
                  { icon: Sparkles, label: 'Format', value: 'Exported as DOCX for broad compatibility' },
                  { icon: ShieldCheck, label: 'Docker', value: 'Runs fully inside the backend container' },
                  { icon: FileText, label: 'Download', value: 'Delivered as a direct DOCX file' },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 p-4">
                      <div className="flex items-center gap-2 text-pepdf-primary font-semibold mb-2">
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </div>
                      <p className="text-slate-500 dark:text-slate-400">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConversionWorkspace>
  );
}
