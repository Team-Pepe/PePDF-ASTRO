import { FileType, ScanLine, Sparkles, ShieldCheck } from 'lucide-react';
import PdfToImageUploader from '../PdfToImageUploader';
import ConversionWorkspace from '../shared/ConversionWorkspace';

export default function PdfToImagePage() {
  return (
    <ConversionWorkspace
      badge="Page extraction"
      titleStart="Turn every PDF into"
      titleAccent="Image pages"
      description="Upload one or more PDFs and extract all pages as PNG images packaged inside a ZIP file. The pipeline stays Docker-friendly and keeps the workflow simple for batch processing."
      accentColor="#7C9EB2"
      backHref="/convert"
      backLabel="Back to convert suite"
      stats={[
        { label: 'Batch size', value: 'Up to 5 PDFs' },
        { label: 'Output', value: 'ZIP of PNGs' },
        { label: 'Render', value: '200 DPI pages' },
      ]}
      steps={[
        {
          title: 'Upload the PDFs',
          description: 'Select one or more PDFs and keep the order you want for the extracted pages.',
        },
        {
          title: 'Render all pages',
          description: 'Each page is converted to a PNG image so the output is easy to preview and reuse.',
        },
        {
          title: 'Download the ZIP',
          description: 'Grab a single archive with all the generated images and keep the workflow compact.',
        },
      ]}
      relatedHref="/convert/image-to-pdf"
      relatedTitle="Need to go from images to a PDF?"
      relatedDescription="Open the opposite workspace and rebuild a document from image assets with the same visual language."
      relatedCta="Open Image to PDF"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] items-start">
          <div className="space-y-4">
            <PdfToImageUploader />
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-3xl bg-white/70 dark:bg-white/5 p-6 md:p-7 border border-slate-200/70 dark:border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-pepdf-primary text-white flex items-center justify-center shadow-lg shadow-pepdf-primary/30">
                  <FileType className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Output style</p>
                  <h3 className="font-semibold text-pepdf-purple-dark dark:text-white">Image export for every page</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  { icon: ScanLine, label: 'Page capture', value: 'All pages are rendered individually' },
                  { icon: Sparkles, label: 'Image format', value: 'Optimized PNG output' },
                  { icon: ShieldCheck, label: 'Safety', value: 'Runs cleanly in Docker' },
                  { icon: FileType, label: 'Archive', value: 'Delivered as a ZIP file' },
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
