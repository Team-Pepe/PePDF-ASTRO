import ToolCard from './ToolCard';
import { QrCode, FileText, Image as ImageIcon, FileCode, Shield, RefreshCw, Key, Download } from 'lucide-react';

export default function ToolGrid() {
  const tools = [
    {
      title: 'QR Generator',
      description: 'Create beautiful, custom QR codes for your links, text, and media with brand colors.',
      icon: <QrCode className="w-8 h-8" />,
      color: '#5228CC',
    },
    {
      title: 'Image ↔ PDF',
      description: 'Lightning fast conversion between images and PDF. Multi-file support and optimization.',
      icon: <ImageIcon className="w-8 h-8" />,
      color: '#7C9EB2',
    },
    {
      title: 'Word ↔ PDF',
      description: 'Maintain formatting while converting Word documents to professional PDF files.',
      icon: <FileText className="w-8 h-8" />,
      color: '#372554',
    },
    {
      title: 'Protect PDF',
      description: 'Secure your documents with AES-256 encryption. Add passwords or restrict copying.',
      icon: <Shield className="w-8 h-8" />,
      color: '#231123',
    },
    {
      title: 'Format Converter',
      description: 'Convert between hundreds of file formats with precision and high-speed processing.',
      icon: <RefreshCw className="w-8 h-8" />,
      color: '#5228CC',
    },
    {
      title: 'Unlock PDF',
      description: 'Remove passwords and restrictions from your PDF documents safely and quickly.',
      icon: <Key className="w-8 h-8" />,
      color: '#7C9EB2',
    },
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-pepdf-purple-dark dark:text-white mb-4">
            Powerful Tools, Simplified.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
            Experience the future of document management. Our tools are built with speed and security in mind.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <ToolCard 
              key={tool.title} 
              {...tool} 
              delay={index * 0.1}
            />
          ))}
        </div>

        <div className="mt-20 glass-card bg-pepdf-primary p-12 rounded-3xl text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white">
              Ready to process your files?
            </h3>
            <p className="text-pepdf-blue-light max-w-xl text-lg opacity-80">
              Join thousands of users who trust PePDF for their daily digital needs. No registration required for basic features.
            </p>
            <button className="bg-white text-pepdf-primary px-8 py-4 rounded-full font-bold shadow-2xl shadow-pepdf-primary/50 hover:bg-slate-100 transition-all active:scale-95 flex items-center gap-2 group">
              Get Started for Free
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}