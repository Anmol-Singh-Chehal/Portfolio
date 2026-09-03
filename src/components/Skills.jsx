import { motion } from 'framer-motion'
import { skillGroups } from '../data/skills.js'

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 border-t border-[var(--border)]">
      <div className="container-page">
        <div className="max-w-lg mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">Skills &amp; tools</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            The stack I reach for most often, grouped by where it fits in a project.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: gi * 0.06 }}
              className="rounded-xl border border-[var(--border)] p-5 hover:border-[var(--signal)]/50 transition-colors"
              style={{ background: 'var(--surface)' }}
            >
              <p className="font-mono text-xs text-[var(--signal)] mb-3">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--text)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
