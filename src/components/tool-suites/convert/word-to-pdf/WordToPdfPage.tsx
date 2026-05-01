import { FileText, PenTool, Sparkles, ShieldCheck } from 'lucide-react';
import WordToPdfUploader from './WordToPdfUploader';
import ConversionWorkspace from '../shared/ConversionWorkspace';

export default function WordToPdfPage() {
  return (
    <ConversionWorkspace
      badge="Office document pipeline"
      titleStart="Convert Word files into"
      titleAccent="Clean PDFs"
      description="Render DOC and DOCX documents through LibreOffice inside the container so the same engine works locally and in Docker."
      accentColor="#372554"
      backHref="/convert"
      backLabel="Back to convert suite"
      stats={[
        { label: 'Input', value: 'DOC / DOCX' },
        { label: 'Output', value: 'Single PDF' },
        { label: 'Engine', value: 'LibreOffice headless' },
      ]}
      steps={[
        {
          title: 'Upload the document',
          description: 'Select a Word file and keep the conversion scope focused to one document at a time.',
        },
        {
          title: 'Render through LibreOffice',
          description: 'The containerized office engine converts the document without relying on host-installed apps.',
        },
        {
          title: 'Download the PDF',
          description: 'Get a ready-to-share PDF that follows the same deployment path in Docker and locally.',
        },
      ]}
      relatedHref="/convert/image-to-pdf"
      relatedTitle="Need to turn images into a PDF?"
      relatedDescription="Use the image pipeline for the opposite direction with the same conversion suite structure."
      relatedCta="Open Image to PDF"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] items-start">
          <div className="space-y-4">
            <WordToPdfUploader />
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-3xl bg-white/70 dark:bg-white/5 p-6 md:p-7 border border-slate-200/70 dark:border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-pepdf-primary text-white flex items-center justify-center shadow-lg shadow-pepdf-primary/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Output style</p>
                  <h3 className="font-semibold text-pepdf-purple-dark dark:text-white">Stable PDF rendering in Docker</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  { icon: PenTool, label: 'Formatting', value: 'Preserves the document layout as rendered' },
                  { icon: Sparkles, label: 'Compatibility', value: 'Uses the same LibreOffice engine in every environment' },
                  { icon: ShieldCheck, label: 'Docker', value: 'Runs fully inside the backend container' },
                  { icon: FileText, label: 'Output', value: 'Delivered as a downloadable PDF file' },
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