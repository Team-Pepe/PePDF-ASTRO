import { Lock, KeyRound, Shield, Fingerprint, FileCheck2, EyeOff } from 'lucide-react';
import ToolSuitePage from '../ToolSuitePage';

export default function ProtectPage() {
  return (
    <ToolSuitePage
      badge="Document Security"
      titleStart="Protect and Control"
      titleAccent="Your PDF Access"
      description="Secure sensitive documents with encryption, permission controls, and sharing-safe outputs in a few guided steps."
      categories={['Encrypt', 'Permissions', 'Unlock', 'Redact', 'Compliance']}
      highlights={['AES-256 Ready', 'Permission Rules', 'Safe Sharing', 'Audit Friendly']}
      primaryCta="Protect file"
      secondaryCta="Compare security options"
      tools={[
        {
          title: 'Encrypt PDF',
          description: 'Add strong password protection to restrict unauthorized opening.',
          color: '#5228CC',
          icon: <Lock className="w-8 h-8" />,
        },
        {
          title: 'Permission Controls',
          description: 'Limit print, copy, and edit permissions to safeguard document intent.',
          color: '#7C9EB2',
          icon: <Shield className="w-8 h-8" />,
        },
        {
          title: 'Unlock Access',
          description: 'Remove password layers when you own the rights to modify the file.',
          color: '#372554',
          icon: <KeyRound className="w-8 h-8" />,
        },
        {
          title: 'Private Redaction',
          description: 'Hide sensitive text and details before sending to clients or partners.',
          color: '#231123',
          icon: <EyeOff className="w-8 h-8" />,
        },
        {
          title: 'Identity Assurance',
          description: 'Use ownership checks and metadata validation before final distribution.',
          color: '#5228CC',
          icon: <Fingerprint className="w-8 h-8" />,
        },
        {
          title: 'Security Summary',
          description: 'Generate a quick overview of active protections and permission scope.',
          color: '#7C9EB2',
          icon: <FileCheck2 className="w-8 h-8" />,
        },
      ]}
      faqs={[
        {
          question: 'What encryption level do you support?',
          answer:
            'Security flows are designed around modern PDF protection standards including strong encryption settings.',
        },
        {
          question: 'Can I allow viewing but block editing?',
          answer:
            'Yes. You can set permission profiles that allow reading while restricting modification and printing.',
        },
        {
          question: 'Is redaction permanent?',
          answer:
            'The redaction workflow is intended to remove exposed content from final shared versions.',
        },
      ]}
    />
  );
}
