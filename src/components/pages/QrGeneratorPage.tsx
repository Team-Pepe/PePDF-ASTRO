import { QrCode, Palette, ScanLine, ImageDown, ShieldCheck, WandSparkles } from 'lucide-react';
import ToolSuitePage from '../ToolSuitePage';

export default function QrGeneratorPage() {
  return (
    <ToolSuitePage
      badge="Smart QR Studio"
      titleStart="Design and Deploy"
      titleAccent="Custom QR Codes"
      description="Generate branded QR experiences for campaigns, menus, portfolios, and product packaging in seconds."
      categories={['URL', 'Wi-Fi', 'vCard', 'Event', 'Social']}
      highlights={['Brand Colors', 'Logo Support', 'Vector Export', 'Scan Tested']}
      primaryCta="Create QR"
      secondaryCta="Explore templates"
      tools={[
        {
          title: 'Dynamic URL QR',
          description: 'Create destination links that can be updated without regenerating the code.',
          color: '#5228CC',
          icon: <QrCode className="w-8 h-8" />,
        },
        {
          title: 'Brand Styling',
          description: 'Apply your palette, corner style, and branded framing in one visual editor.',
          color: '#7C9EB2',
          icon: <Palette className="w-8 h-8" />,
        },
        {
          title: 'Scan Validation',
          description: 'Run readability checks to keep your QR reliable across print and mobile.',
          color: '#372554',
          icon: <ScanLine className="w-8 h-8" />,
        },
        {
          title: 'Export Formats',
          description: 'Download PNG, SVG, and PDF outputs tailored for digital and physical media.',
          color: '#231123',
          icon: <ImageDown className="w-8 h-8" />,
        },
        {
          title: 'Secure Redirects',
          description: 'Protect destination integrity with controlled redirect behavior and rules.',
          color: '#5228CC',
          icon: <ShieldCheck className="w-8 h-8" />,
        },
        {
          title: 'Preset Themes',
          description: 'Use built-in visual presets for modern, minimal, and high-contrast brands.',
          color: '#7C9EB2',
          icon: <WandSparkles className="w-8 h-8" />,
        },
      ]}
      faqs={[
        {
          question: 'Will custom colors affect scan quality?',
          answer:
            'Contrast and quiet-zone checks help ensure your chosen palette still scans reliably on most devices.',
        },
        {
          question: 'Can I add my logo in the center?',
          answer:
            'Yes. You can upload a logo and preview the final QR readability before export.',
        },
        {
          question: 'Which format should I use for print?',
          answer:
            'SVG or PDF is recommended for print workflows because they preserve sharpness at any size.',
        },
      ]}
    />
  );
}
