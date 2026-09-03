import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Loader2 } from 'lucide-react'
import { adminLogin, getAdminToken } from '../services/admin.js'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (getAdminToken()) {
    navigate('/admin/dashboard', { replace: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await adminLogin(id.trim(), password)
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(err.message || 'Invalid ID or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 text-[var(--muted)]">
          <Lock size={16} />
          <span className="font-mono text-xs">RESTRICTED ACCESS</span>
        </div>

        <h1 className="font-display text-2xl font-semibold mb-8">Admin sign in</h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="admin-id" className="block text-sm font-medium mb-1.5">ID</label>
            <input
              id="admin-id"
              type="text"
              autoComplete="username"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm bg-[var(--surface)] focus:border-[var(--signal)] outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium mb-1.5">Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm bg-[var(--surface)] focus:border-[var(--signal)] outline-none transition-colors"
            />
          </div>

          {error && <p className="text-sm text-[var(--flare)]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-3 rounded-full bg-[var(--signal)] text-[var(--bg)] hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
