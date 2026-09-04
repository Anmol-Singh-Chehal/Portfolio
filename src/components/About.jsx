import { motion } from 'framer-motion'
import { social } from '../data/social.js'

const focusCards = [
  {
    title: 'Full-stack Development',
    detail: 'React · Node.js · Express · FastAPI · REST APIs',
  },
  {
    title: 'AI / ML & Deep Learning',
    detail: 'PyTorch · TensorFlow · CNNs · Transformers · timm',
  },
  {
    title: 'Databases & Cloud',
    detail: 'MongoDB · MySQL · MongoDB Atlas · Cloudinary',
  },
  {
    title: 'Development & Tools',
    detail: 'Git · GitHub · Postman · CI/CD · Redux · RTK Query',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-[var(--border)]">
      <div className="container-page grid md:grid-cols-2 gap-14 md:gap-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">About me</h2>
          <div className="space-y-4 text-[var(--muted)] leading-relaxed max-w-md">
            <div className="space-y-4 text-[var(--muted)] leading-relaxed max-w-md">
              <p>
                I&apos;m a Computer Engineering student pursuing my B.E. at
                Thapar Institute of Engineering and Technology, with a focus on
                AI/ML, Computer Vision, and full-stack development.
              </p>

              <p>
                I take real-world datasets through preprocessing, feature engineering,
                model training, fine-tuning, evaluation, and optimization to build
                efficient and accurate AI systems. I also create end-to-end full-stack
                applications that turn these models into practical solutions for
                real-world problems.
              </p>

              <p>
                Alongside development, I&apos;ve solved 200+ LeetCode problems covering
                Dynamic Programming, Divide and Conquer, Monotonic Stack, Hash Tables,
                Trees, Arrays, Strings, Two Pointers, Matrices, Stacks, Sorting, and
                Linked Lists
                — strengthening my problem-solving and algorithmic thinking.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="space-y-4"
        >
          <div className="rounded-xl border border-[var(--border)] p-6" style={{ background: 'var(--surface)' }}>
            <p className="font-mono text-xs text-[var(--muted)] mb-1">Currently</p>
            <p className="font-medium">B.E. Computer Engineering, 2024 – 2027</p>
            <p className="text-sm text-[var(--muted)] mt-1">Thapar Institute of Engineering and Technology, Patiala</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {focusCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl border border-[var(--border)] p-4 hover:border-[var(--signal)]/50 transition-colors"
                style={{ background: 'var(--surface)' }}
              >
                <p className="font-medium text-sm mb-1.5">{card.title}</p>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{card.detail}</p>
              </motion.div>
            ))}
          </div>

          <a
            href={social.leetcode}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-[var(--border)] p-4 hover:border-[var(--signal)]/50 transition-colors"
            style={{ background: 'var(--surface)' }}
          >
            <p className="font-medium text-sm mb-1">200+ DSA problems solved</p>
            <p className="text-xs text-[var(--muted)]">Dynamic Programming · Divide & Conquer · Arrays · Stacks & Queues · Trees · Linked Lists · and more — on LeetCode</p>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
