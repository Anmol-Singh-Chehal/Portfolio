import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Github, ExternalLink } from 'lucide-react'
import { projects, getProjectBySlug } from '../data/projects.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function ProjectDetails() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <Navigate to="/404" replace />

  const index = projects.findIndex((p) => p.slug === slug)
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="pb-24">
      <header className="border-b border-[var(--border)] py-16 md:py-20" style={{ background: 'var(--surface)' }}>
        <div className="container-page">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--signal)] transition-colors mb-8"
          >
            <ArrowLeft size={15} /> Back to projects
          </Link>

          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="font-mono text-xs px-2.5 py-1 rounded-full border border-[var(--signal)]/40 text-[var(--signal)]">
              {project.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mt-5 mb-4 text-balance">
              {project.title}
            </h1>
            <p className="text-lg text-[var(--muted)] max-w-2xl leading-relaxed mb-8">{project.description}</p>

            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--signal)] hover:text-[var(--signal)] transition-colors"
                >
                  <Github size={15} /> View code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full bg-[var(--signal)] text-[var(--bg)]"
                >
                  <ExternalLink size={15} /> Live demo
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container-page pt-16 grid md:grid-cols-[1fr_280px] gap-14">
        <div className="space-y-14 max-w-2xl">
          <Section title="Overview" text={project.overview} />
          <Section title="The problem" text={project.problem} />
          <Section title="The solution" text={project.solution} />
          <Section title="Approach" text={project.approach} />

          {project.features?.length > 0 && (
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-display text-xl font-semibold mb-4">Key features</h2>
              <ul className="space-y-2.5">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-3 text-[var(--muted)] leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--signal)] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <Section title="What I learned" text={project.learnings} />
        </div>

        <motion.aside
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="space-y-6 h-fit md:sticky md:top-24"
        >
          {project.metrics?.length > 0 && (
            <div className="rounded-xl border border-[var(--border)] p-5" style={{ background: 'var(--surface)' }}>
              <p className="font-mono text-xs text-[var(--muted)] mb-4">Results</p>
              <div className="space-y-4">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-2xl font-semibold text-[var(--signal)]">{m.value}</p>
                    <p className="text-xs text-[var(--muted)] mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-[var(--border)] p-5" style={{ background: 'var(--surface)' }}>
            <p className="font-mono text-xs text-[var(--muted)] mb-3">Technology stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-md border border-[var(--border)]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>

      <nav className="container-page pt-20 grid grid-cols-2 gap-4 border-t border-[var(--border)] mt-16">
        <Link
          to={`/projects/${prev.slug}`}
          className="group rounded-xl border border-[var(--border)] p-5 hover:border-[var(--signal)]/50 transition-colors"
        >
          <p className="text-xs text-[var(--muted)] flex items-center gap-1.5 mb-1.5">
            <ArrowLeft size={13} /> Previous
          </p>
          <p className="font-display font-medium group-hover:text-[var(--signal)] transition-colors">{prev.title}</p>
        </Link>
        <Link
          to={`/projects/${next.slug}`}
          className="group rounded-xl border border-[var(--border)] p-5 text-right hover:border-[var(--signal)]/50 transition-colors"
        >
          <p className="text-xs text-[var(--muted)] flex items-center justify-end gap-1.5 mb-1.5">
            Next <ArrowRight size={13} />
          </p>
          <p className="font-display font-medium group-hover:text-[var(--signal)] transition-colors">{next.title}</p>
        </Link>
      </nav>
    </article>
  )
}

function Section({ title, text }) {
  if (!text) return null
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
      <h2 className="font-display text-xl font-semibold mb-3">{title}</h2>
      <p className="text-[var(--muted)] leading-relaxed">{text}</p>
    </motion.div>
  )
}
