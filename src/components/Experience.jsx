import { motion } from 'framer-motion'
import { experience } from '../data/experience.js'

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 border-t border-[var(--border)]">
      <div className="container-page">
        <div className="max-w-lg mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">Experience &amp; education</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            A timeline of my academic journey, technical growth, and development experience.
          </p>
        </div>

        <div className="relative max-w-2xl">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border)]" aria-hidden="true" />
          <ul className="space-y-10">
            {experience.map((entry, i) => (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8"
              >
                <span
                  className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2"
                  style={{ borderColor: 'var(--signal)', background: 'var(--bg)' }}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                  <h3 className="font-display font-semibold text-lg">{entry.role}</h3>
                  <span className="text-xs font-mono text-[var(--signal)]">{entry.type}</span>
                </div>
                <p className="text-sm font-medium text-[var(--text)] mb-1">{entry.organization}</p>
                <p className="text-xs text-[var(--muted)] mb-3">
                  {entry.date} · {entry.location}
                </p>
                <p className="text-sm text-[var(--muted)] leading-relaxed max-w-lg mb-3">{entry.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {entry.technologies.map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-0.5 rounded-md border border-[var(--border)] text-[var(--muted)]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
