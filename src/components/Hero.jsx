import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import DeveloperAvatar from './DeveloperAvatar.jsx'
import { social } from '../data/social.js'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-14 md:pt-20 pb-24">
      <div className="container-page grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--signal)] border border-[var(--signal)]/30 rounded-full px-3 py-1 mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-blink" />
            Available for opportunities
          </motion.div>

          <motion.p variants={item} className="text-[var(--muted)] font-medium mb-3">
            Hi, I&apos;m Anmol Singh.
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-semibold text-[2.6rem] leading-[1.08] sm:text-5xl md:text-6xl text-balance mb-6"
          >
            Full-stack developer,
            <br />
            AI/ML engineer.
          </motion.h1>

          <motion.p variants={item} className="text-[var(--muted)] text-lg leading-relaxed max-w-lg mb-9">
            I engineer efficient AI models and end-to-end full-stack applications, turning deep learning research into accurate, practical solutions for real-world problems.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-full bg-[var(--signal)] text-[var(--bg)] hover:opacity-90 transition-opacity"
            >
              View my work
            </a>
            <a
              href={social.resume}
              download
              className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-full border border-[var(--border)] hover:border-[var(--signal)] hover:text-[var(--signal)] transition-colors"
            >
              Download resume
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-5 text-[var(--muted)]">
            <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-[var(--signal)] transition-colors">
              <Github size={19} />
            </a>
            <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[var(--signal)] transition-colors">
              <Linkedin size={19} />
            </a>
            <a href={`mailto:${social.email}`} aria-label="Email" className="hover:text-[var(--signal)] transition-colors">
              <Mail size={19} />
            </a>
            <a
              href={social.leetcode}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm hover:text-[var(--signal)] transition-colors"
            >
              LeetCode <ExternalLink size={13} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
        >
          <DeveloperAvatar />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex flex-col items-center gap-2 text-[var(--muted)] text-xs font-mono mt-4"
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
