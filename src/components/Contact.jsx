import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Copy, Check, Loader2 } from 'lucide-react'
import { sendMessage } from '../services/contact.js'
import { social } from '../data/social.js'

const initialForm = { name: '', email: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Enter your name.'
  if (!form.email.trim()) {
    errors.email = 'Enter your email.'
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!form.message.trim()) errors.message = 'Write a short message.'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copied, setCopied] = useState(false)

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validate(form)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus('sending')
    try {
      const result = await sendMessage(form)
      if (result?.ok) {
        setStatus('sent')
        setForm(initialForm)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(social.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard unavailable — silently ignore, email is still visible/selectable.
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-[var(--border)]">
      <div className="container-page grid md:grid-cols-[1fr_1.1fr] gap-14 md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">Let&apos;s build something</h2>
          <p className="text-[var(--muted)] leading-relaxed max-w-sm mb-8">
            Have an idea, opportunity, or interesting project? I&apos;d love to hear about it.
          </p>

          <div className="space-y-3">
            <button
              onClick={copyEmail}
              className="flex items-center gap-3 text-sm w-full text-left rounded-xl border border-[var(--border)] px-4 py-3 hover:border-[var(--signal)]/50 transition-colors"
              style={{ background: 'var(--surface)' }}
            >
              <Mail size={17} className="text-[var(--signal)] shrink-0" />
              <span className="flex-1 truncate">{social.email}</span>
              {copied ? <Check size={15} className="text-[var(--signal)]" /> : <Copy size={15} className="text-[var(--muted)]" />}
            </button>

            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm rounded-xl border border-[var(--border)] px-4 py-3 hover:border-[var(--signal)]/50 transition-colors"
              style={{ background: 'var(--surface)' }}
            >
              <Linkedin size={17} className="text-[var(--signal)] shrink-0" />
              <span className="flex-1">LinkedIn</span>
            </a>

            <a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm rounded-xl border border-[var(--border)] px-4 py-3 hover:border-[var(--signal)]/50 transition-colors"
              style={{ background: 'var(--surface)' }}
            >
              <Github size={17} className="text-[var(--signal)] shrink-0" />
              <span className="flex-1">GitHub</span>
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              aria-invalid={!!errors.name}
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm bg-[var(--surface)] focus:border-[var(--signal)] outline-none transition-colors"
            />
            {errors.name && <p className="text-xs text-[var(--flare)] mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              aria-invalid={!!errors.email}
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm bg-[var(--surface)] focus:border-[var(--signal)] outline-none transition-colors"
            />
            {errors.email && <p className="text-xs text-[var(--flare)] mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={handleChange('message')}
              aria-invalid={!!errors.message}
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm bg-[var(--surface)] focus:border-[var(--signal)] outline-none transition-colors resize-none"
            />
            {errors.message && <p className="text-xs text-[var(--flare)] mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-full bg-[var(--signal)] text-[var(--bg)] hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {status === 'sending' && <Loader2 size={15} className="animate-spin" />}
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'sent' && (
            <p className="text-sm text-[var(--signal)]">Message sent — I&apos;ll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-[var(--flare)]">
              Something went wrong. Please email me directly at {social.email}.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
