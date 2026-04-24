import { FileStack, Minimize2, Scissors, FileCheck, FolderArchive } from 'lucide-react';
import ToolSuitePage from '../ToolSuitePage';

export default function PdfToolsPage() {
  return (
    <ToolSuitePage
      badge="Core PDF Workspace"
      titleStart="Professional"
      titleAccent="PDF Toolkit"
      description="Handle every core document task in one place, from merge and split to compression and final quality checks."
      categories={['Merge', 'Split', 'Compress', 'Reorder', 'Watermark']}
      highlights={['Batch Ready', 'Local Privacy', 'Fast Processing', 'No Signup Needed']}
      primaryCta="Upload PDF"
      secondaryCta="View sample workflow"
      tools={[
        {
          title: 'Merge PDFs',
          description: 'Combine multiple documents into one polished PDF while keeping source quality.',
          color: '#5228CC',
          icon: <FileStack className="w-8 h-8" />,
        },
        {
          title: 'Split Pages',
          description: 'Extract single pages or create custom ranges for cleaner document distribution.',
          color: '#7C9EB2',
          icon: <Scissors className="w-8 h-8" />,
        },
        {
          title: 'Compress Size',
          description: 'Reduce heavy files without compromising readability or print-friendly output.',
          color: '#372554',
          icon: <Minimize2 className="w-8 h-8" />,
        },
        {
          title: 'Reorder Pages',
          description: 'Drag, rearrange, and remove pages to optimize flow before sharing.',
          color: '#231123',
          icon: <FolderArchive className="w-8 h-8" />,
        },
        {
          title: 'Final Preflight',
          description: 'Validate page count, metadata, and output profile before export.',
          color: '#7C9EB2',
          icon: <FileCheck className="w-8 h-8" />,
        },
      ]}
      faqs={[
        {
          question: 'Can I process large PDFs without losing quality?',
          answer:
            'Yes. Compression and merge flows are tuned to preserve readability while reducing unnecessary file weight.',
        },
        {
          question: 'Do my files stay private?',
          answer:
            'Your workflow is designed around privacy-first handling and secure transfer standards for sensitive documents.',
        },
        {
          question: 'Is there a page limit?',
          answer:
            'You can process common business-sized documents directly. Larger batch limits can be enabled in later plan tiers.',
        },
      ]}
    />
  );
}
