import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'

const FILTERS = ['All', 'AI / Full-Stack', 'Computer Vision']

function matchesFilter(project, filter) {
  if (filter === 'All') return true
  if (filter === 'AI / Full-Stack') return project.category.includes('Full-Stack')
  if (filter === 'Computer Vision') return project.category.includes('Vision') || project.category.includes('Transformers')
  return true
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const filtered = useMemo(() => projects.filter((p) => matchesFilter(p, filter)), [filter])

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-[var(--border)]">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-lg">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">Featured projects</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Full-stack platforms built around deep learning models I trained and shipped
              behind a real interface.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="relative text-sm px-4 py-2 rounded-full border transition-colors"
                style={{
                  borderColor: filter === f ? 'var(--signal)' : 'var(--border)',
                  color: filter === f ? 'var(--signal)' : 'var(--muted)',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-[var(--muted)] text-sm mt-6">No projects match this filter yet.</p>
        )}
      </div>
    </section>
  )
}
