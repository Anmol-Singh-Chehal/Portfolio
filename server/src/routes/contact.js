import { Router } from 'express'
import { Message } from '../models/Message.js'

const router = Router()

const EMAIL_RE = /^\S+@\S+\.\S+$/

// Very small in-memory rate limiter: max 5 submissions per IP per 10 minutes.
// Good enough for a personal portfolio; swap for a real store if traffic grows.
const submissionLog = new Map()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

function isRateLimited(ip) {
  const now = Date.now()
  const timestamps = (submissionLog.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  timestamps.push(now)
  submissionLog.set(ip, timestamps)
  return timestamps.length > MAX_PER_WINDOW
}

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body || {}

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' })
    }
    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return res.status(400).json({ error: 'A valid email is required.' })
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' })
    }

    if (isRateLimited(req.ip)) {
      return res.status(429).json({ error: 'Too many messages sent — please try again later.' })
    }

    const saved = await Message.create({
      name: name.trim().slice(0, 200),
      email: email.trim().slice(0, 200),
      message: message.trim().slice(0, 5000),
    })

    return res.status(201).json({ ok: true, id: saved._id })
  } catch (err) {
    console.error('[contact route] failed to save message:', err.message)
    return res.status(500).json({ error: 'Could not save your message right now.' })
  }
})

export default router
