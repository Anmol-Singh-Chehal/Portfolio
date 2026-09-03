import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Code2 } from 'lucide-react'
import { fetchGithubProfile } from '../services/github.js'
import { social } from '../data/social.js'

export default function Beyond() {
  const [profile, setProfile] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | unavailable

  useEffect(() => {
    let mounted = true
    fetchGithubProfile().then((data) => {
      if (!mounted) return
      if (data) {
        setProfile(data)
        setStatus('ready')
      } else {
        setStatus('unavailable')
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="py-24 md:py-32 border-t border-[var(--border)]">
      <div className="container-page">
        <div className="max-w-lg mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">Beyond the resume</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Where the day-to-day practice happens — repositories and problem-solving.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <motion.a
            href={social.github}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-[var(--border)] p-6 hover:border-[var(--signal)]/50 transition-colors flex flex-col justify-between"
            style={{ background: 'var(--surface)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <Github size={20} />
              <ExternalLink size={14} className="text-[var(--muted)]" />
            </div>
            <div>
              <p className="font-mono text-2xl font-semibold mb-1">
                {status === 'ready' && profile?.public_repos != null ? profile.public_repos : '—'}
              </p>
              <p className="text-sm text-[var(--muted)]">
                {status === 'ready' ? 'public repositories' : status === 'loading' ? 'Loading GitHub data…' : 'View repositories on GitHub'}
              </p>
            </div>
          </motion.a>

          <motion.a
            href={social.leetcode}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-xl border border-[var(--border)] p-6 hover:border-[var(--signal)]/50 transition-colors flex flex-col justify-between"
            style={{ background: 'var(--surface)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <Code2 size={20} />
              <ExternalLink size={14} className="text-[var(--muted)]" />
            </div>
            <div>
              <p className="font-mono text-2xl font-semibold mb-1">200+</p>
              <p className="text-sm text-[var(--muted)]">DSA problems solved on LeetCode</p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
