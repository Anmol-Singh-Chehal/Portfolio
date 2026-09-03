import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Github } from 'lucide-react'

export default function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className="group rounded-2xl border border-[var(--border)] overflow-hidden hover:border-[var(--signal)]/50 transition-colors"
      style={{ background: 'var(--surface)' }}
    >
      <Link to={`/projects/${project.slug}`} className="block">
        <div
          className="relative h-44 flex items-center justify-center overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, var(--surface-raised) 0%, var(--bg) 100%)',
          }}
        >
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={i} x1={(i + 1) * 14} y1="0" x2={(i + 1) * 14} y2="100" stroke="var(--border)" strokeWidth="0.3" />
            ))}
          </svg>
          <span className="relative font-display text-2xl font-semibold text-[var(--text)]/80 group-hover:scale-105 transition-transform duration-300">
            {project.title}
          </span>
          <span className="absolute top-3 left-3 font-mono text-[10px] px-2 py-1 rounded-full border border-[var(--signal)]/40 text-[var(--signal)]">
            {project.category}
          </span>
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/projects/${project.slug}`}>
          <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-[var(--signal)] transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{project.tagline}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs font-mono px-2 py-1 rounded-md border border-[var(--border)] text-[var(--muted)]">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 font-medium text-[var(--text)] hover:text-[var(--signal)] transition-colors"
          >
            View details <ArrowUpRight size={14} />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[var(--muted)] hover:text-[var(--signal)] transition-colors"
            >
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
