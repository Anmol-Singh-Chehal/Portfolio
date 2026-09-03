import { motion } from 'framer-motion'
import portrait from '../assets/anmol-portrait.jpg'

const chips = [
  { label: 'React', x: '-6%', y: '14%', delay: 1.0 },
  { label: 'PyTorch', x: '78%', y: '8%', delay: 1.15 },
  { label: 'OpenCV', x: '80%', y: '80%', delay: 1.3 },
]

export default function DeveloperAvatar() {
  return (
    <div className="relative aspect-[4/5] w-full max-w-md mx-auto select-none">
      {/* soft ambient glow behind the card, echoes the photo's own rim light */}
      <motion.div
        className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-40"
        style={{ background: 'radial-gradient(circle, var(--signal) 0%, transparent 70%)' }}
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <motion.div
        className="relative h-full rounded-2xl border overflow-hidden"
        style={{ borderColor: 'var(--border)' }}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.img
          src={portrait}
          alt="Anmol Singh smiling, wearing a black turban and white shirt"
          className="w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />

        {/* subtle rotating dashed ring, mostly behind the frame edge */}
        <motion.svg
          className="absolute -top-10 -right-10 w-40 h-40 opacity-50 pointer-events-none"
          viewBox="0 0 160 160"
          animate={{ rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          <circle cx="80" cy="80" r="70" fill="none" stroke="var(--signal)" strokeWidth="1" strokeDasharray="2 8" />
        </motion.svg>

        {/* bottom gradient + identity readout, tying it back to the site's mono/data language */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <span className="font-mono text-[10px] text-white/90 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-blink" />
            Patiala, India
          </span>
          <span className="font-mono text-[10px] text-white/70">TIET</span>
        </motion.div>
      </motion.div>

      {/* floating skill chips */}
      {chips.map((c) => (
        <motion.span
          key={c.label}
          className="absolute font-mono text-[10px] px-2.5 py-1 rounded-full border backdrop-blur-sm"
          style={{
            left: c.x,
            top: c.y,
            borderColor: 'var(--signal)',
            color: 'var(--signal)',
            background: 'var(--surface)',
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: c.delay, duration: 0.5 },
            y: { delay: c.delay, duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {c.label}
        </motion.span>
      ))}
    </div>
  )
}
