import { FileImage, Layers3, Sparkles, ShieldCheck } from 'lucide-react';
import ImageToPdfUploader from '../ImageToPdfUploader';
import ConversionWorkspace from '../shared/ConversionWorkspace';

export default function ImageToPdfPage() {
  return (
    <ConversionWorkspace
      badge="Image pipeline"
      titleStart="Build a PDF from"
      titleAccent="Your images"
      description="Arrange JPG, PNG, WebP, BMP, or TIFF assets and turn them into a clean PDF in one pass. The conversion keeps the visual fidelity of the source files and is tuned for Docker-first deployment."
      accentColor="#5228CC"
      backHref="/convert"
      backLabel="Back to convert suite"
      stats={[
        { label: 'Batch size', value: 'Up to 10 files' },
        { label: 'Output', value: 'Single PDF' },
        { label: 'Focus', value: 'Lossless layout' },
      ]}
      steps={[
        {
          title: 'Add your images',
          description: 'Drop one or more supported images and keep the upload order you want in the final document.',
        },
        {
          title: 'Review the batch',
          description: 'Check the selected files, remove any mismatch, and keep the flow tight before conversion.',
        },
        {
          title: 'Download the PDF',
          description: 'Generate a single document that is ready to share, archive, or print immediately.',
        },
      ]}
      relatedHref="/convert/pdf-to-image"
      relatedTitle="Need to extract pages from a PDF?"
      relatedDescription="Open the reverse workspace and turn PDFs into a ZIP of page images without leaving the conversion area."
      relatedCta="Open PDF to Image"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] items-start">
          <div className="space-y-4">
            <ImageToPdfUploader />
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-3xl bg-white/70 dark:bg-white/5 p-6 md:p-7 border border-slate-200/70 dark:border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-pepdf-primary text-white flex items-center justify-center shadow-lg shadow-pepdf-primary/30">
                  <FileImage className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Output style</p>
                  <h3 className="font-semibold text-pepdf-purple-dark dark:text-white">One clean PDF, every time</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  { icon: Layers3, label: 'Page order', value: 'Matches upload order' },
                  { icon: Sparkles, label: 'Quality', value: 'Retains source fidelity' },
                  { icon: ShieldCheck, label: 'Safety', value: 'Processed locally in Docker' },
                  { icon: FileImage, label: 'Formats', value: 'PNG, JPG, WebP, BMP, TIFF' },
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
