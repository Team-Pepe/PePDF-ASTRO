import ToolCard from '../shared/ToolCard';
import { QrCode, FileText, Image as ImageIcon, Shield, RefreshCw, Key } from 'lucide-react';

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
      </div>
    </section>
  );
}