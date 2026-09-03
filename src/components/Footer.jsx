import { Github, Linkedin, Mail } from 'lucide-react'
import { social } from '../data/social.js'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-display font-semibold">{social.name}</p>
          <p className="text-sm text-[var(--muted)]">Full-Stack Developer · AI/ML &amp; Computer Vision</p>
        </div>

        <div className="flex items-center gap-5">
          <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-[var(--muted)] hover:text-[var(--signal)] transition-colors">
            <Github size={18} />
          </a>
          <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-[var(--muted)] hover:text-[var(--signal)] transition-colors">
            <Linkedin size={18} />
          </a>
          <a href={`mailto:${social.email}`} aria-label="Email" className="text-[var(--muted)] hover:text-[var(--signal)] transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>
      <div className="container-page mt-6 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--muted)]">
        <span>© {new Date().getFullYear()} {social.name}</span>
        <span>Built with React + Vite + Tailwind</span>
      </div>
    </footer>
  )
}
