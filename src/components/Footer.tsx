import { Github, Linkedin, Mail } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ResumeData } from '../types/Resume';

type FooterProps = {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  ariaLabels: ResumeData['ariaLabels'];
};

export function Footer({
  name,
  phone,
  email,
  linkedin,
  ariaLabels,
}: FooterProps) {
  const whatsappNumber = phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <footer
      className="bg-zinc-950 border-t border-zinc-900 py-12 px-6 lg:px-24 text-center"
    >
      <nav aria-label={ariaLabels.socialLinks}>
        <div className="flex justify-center gap-8 mb-8 items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-[#25D366] transition-colors"
            aria-label={`${ariaLabels.openWhatsApp} ${phone}`}
          >
            <WhatsAppIcon size={24} aria-hidden="true" />
          </a>
          <a
            href="#"
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label={ariaLabels.openGithub}
          >
            <Github size={24} aria-hidden="true" />
          </a>
          <a
            href={`https://${linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label={ariaLabels.openLinkedIn}
          >
            <Linkedin size={24} aria-hidden="true" />
          </a>
          <a
            href={`mailto:${email}`}
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label={`${ariaLabels.sendEmail} ${email}`}
          >
            <Mail size={24} aria-hidden="true" />
          </a>
        </div>
      </nav>
      <p className="text-zinc-600 text-sm">
        &copy; {new Date().getFullYear()} {name}. All rights reserved.
      </p>
    </footer>
  );
}
