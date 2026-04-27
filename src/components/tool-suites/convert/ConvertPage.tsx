import { FileType, FileImage, FileText, RefreshCw, Copy, Gauge } from 'lucide-react';
import ToolSuitePage from '../ToolSuitePage';

export default function ConvertPage() {
  return (
    <>
      <ToolSuitePage
        badge="Universal Conversion"
        titleStart="Convert Files"
        titleAccent="Without Friction"
        description="Move between document and image formats with clean output, consistent structure, and speed optimized for daily workflows."
        categories={['Image to PDF', 'PDF to Image', 'Word to PDF', 'PDF to Word', 'Batch Convert']}
        highlights={['High Accuracy', 'Fast Queue', 'Format Presets', 'Clean Layout']}
        primaryCta="Upload file"
        secondaryCta="See conversion matrix"
        tools={[
          {
            title: 'Image to PDF',
            description: 'Convert JPG and PNG assets into one structured PDF with page controls.',
            color: '#5228CC',
            icon: <FileImage className="w-8 h-8" />,
            href: '/convert/image-to-pdf',
          },
          {
            title: 'PDF to Image',
            description: 'Export pages to high-resolution image outputs for social and presentations.',
            color: '#7C9EB2',
            icon: <FileType className="w-8 h-8" />,
            href: '/convert/pdf-to-image',
          },
          {
            title: 'Word to PDF',
            description: 'Preserve typography and spacing while delivering professional PDF documents.',
            color: '#372554',
            icon: <FileText className="w-8 h-8" />,
            href: '/convert/word-to-pdf',
          },
          {
            title: 'PDF to Word',
            description: 'Recover editable text and structure for quick updates and collaboration.',
            color: '#231123',
            icon: <RefreshCw className="w-8 h-8" />,
          },
          {
            title: 'Batch Convert',
            description: 'Convert multiple files at once with consistent settings and optimized output naming.',
            color: '#7C9EB2',
            icon: <Copy className="w-8 h-8" />,
          },
          {
            title: 'Speed Profiles',
            description: 'Choose between balanced quality or performance-focused conversion pipelines.',
            color: '#7C9EB2',
            icon: <Gauge className="w-8 h-8" />,
          },
        ]}
        faqs={[
          {
            question: 'How accurate is PDF to Word conversion?',
            answer:
              'Most business documents retain strong structure and editable content, especially files with clean source formatting.',
          },
          {
            question: 'Can I convert multiple files at once?',
            answer:
              'Yes. Batch mode is designed for repetitive workflows and consistent output naming.',
          },
          {
            question: 'Do you optimize output size automatically?',
            answer:
              'You can select presets that balance visual quality, fidelity, and final file weight.',
          },
        ]}
      />
    </>
  );
}
