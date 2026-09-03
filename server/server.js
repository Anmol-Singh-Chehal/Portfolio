import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './src/db.js'
import contactRoutes from './src/routes/contact.js'
import adminRoutes from './src/routes/admin.js'

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean)

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  })
)
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/contact', contactRoutes)
app.use('/api/admin', adminRoutes)

app.use((req, res) => res.status(404).json({ error: 'Not found.' }))

const PORT = process.env.PORT || 4000

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`[server] listening on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('[server] failed to connect to MongoDB, exiting:', err.message)
    process.exit(1)
  })
