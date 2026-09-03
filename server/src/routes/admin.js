import { Router } from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Message } from '../models/Message.js'
import { requireAdmin } from '../middleware/auth.js'

const router = Router()

// Simple in-memory brute-force guard: 8 attempts per IP per 15 minutes.
const attemptLog = new Map()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 8

function isLockedOut(ip) {
  const now = Date.now()
  const timestamps = (attemptLog.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  return timestamps.length >= MAX_ATTEMPTS
}
function recordAttempt(ip) {
  const now = Date.now()
  const timestamps = (attemptLog.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  timestamps.push(now)
  attemptLog.set(ip, timestamps)
}

function verifyPassword(password) {
  const salt = process.env.ADMIN_PASSWORD_SALT
  const expectedHash = Buffer.from(process.env.ADMIN_PASSWORD_HASH, 'hex')
  const actualHash = crypto.scryptSync(password, salt, 64)
  return expectedHash.length === actualHash.length && crypto.timingSafeEqual(expectedHash, actualHash)
}

router.post('/login', (req, res) => {
  if (isLockedOut(req.ip)) {
    return res.status(429).json({ error: 'Too many attempts — try again later.' })
  }

  const { id, password } = req.body || {}
  recordAttempt(req.ip)

  if (id !== process.env.ADMIN_ID || !password || !verifyPassword(password)) {
    return res.status(401).json({ error: 'Invalid ID or password.' })
  }

  const token = jwt.sign({ role: 'admin', id }, process.env.JWT_SECRET, { expiresIn: '12h' })
  return res.json({ token, expiresIn: '12h' })
})

router.get('/messages', requireAdmin, async (req, res) => {
  try {
    const { q, status, from, to, sort = 'newest', page = 1, limit = 25 } = req.query

    const filter = {}
    if (q && q.trim()) {
      const regex = new RegExp(q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      filter.$or = [{ name: regex }, { email: regex }, { message: regex }]
    }
    if (status === 'read') filter.read = true
    if (status === 'unread') filter.read = false
    if (from || to) {
      filter.createdAt = {}
      if (from) filter.createdAt.$gte = new Date(from)
      if (to) filter.createdAt.$lte = new Date(to)
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1)
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 25))

    const [messages, total, unreadCount] = await Promise.all([
      Message.find(filter)
        .sort({ createdAt: sort === 'oldest' ? 1 : -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Message.countDocuments(filter),
      Message.countDocuments({ read: false }),
    ])

    res.json({ messages, total, page: pageNum, limit: limitNum, unreadCount })
  } catch (err) {
    console.error('[admin messages] failed:', err.message)
    res.status(500).json({ error: 'Could not load messages.' })
  }
})

router.patch('/messages/:id', requireAdmin, async (req, res) => {
  try {
    const { read } = req.body || {}
    const updated = await Message.findByIdAndUpdate(req.params.id, { read: !!read }, { new: true })
    if (!updated) return res.status(404).json({ error: 'Message not found.' })
    res.json({ ok: true, message: updated })
  } catch {
    res.status(400).json({ error: 'Could not update message.' })
  }
})

router.delete('/messages/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Message not found.' })
    res.json({ ok: true })
  } catch {
    res.status(400).json({ error: 'Could not delete message.' })
  }
})

export default router
