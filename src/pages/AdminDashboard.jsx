import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, LogOut, Trash2, Mail, MailOpen, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { getAdminToken, clearAdminToken, fetchMessages, markMessageRead, deleteMessage } from '../services/admin.js'

const PAGE_SIZE_LABEL = 'messages'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)

  const [data, setData] = useState({ messages: [], total: 0, unreadCount: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!getAdminToken()) navigate('/admin', { replace: true })
  }, [navigate])

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await fetchMessages({ q, status, from, to, sort, page })
      setData(result)
    } catch (err) {
      if (err.status === 401) {
        clearAdminToken()
        navigate('/admin', { replace: true })
        return
      }
      setError(err.message || 'Could not load messages.')
    } finally {
      setLoading(false)
    }
  }, [q, status, from, to, sort, page, navigate])

  useEffect(() => {
    load()
  }, [load])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    load()
  }

  const toggleRead = async (msg) => {
    await markMessageRead(msg._id, !msg.read)
    load()
  }

  const remove = async (msg) => {
    if (!window.confirm(`Delete the message from ${msg.name}? This can't be undone.`)) return
    await deleteMessage(msg._id)
    load()
  }

  const logout = () => {
    clearAdminToken()
    navigate('/admin', { replace: true })
  }

  const totalPages = Math.max(1, Math.ceil((data.total || 0) / 25))

  return (
    <div className="container-page py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold">Contact messages</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            {data.total} total · {data.unreadCount} unread
          </p>
        </div>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--flare)] hover:text-[var(--flare)] transition-colors"
        >
          <LogOut size={15} /> Sign out
        </button>
      </div>

      <div className="rounded-xl border border-[var(--border)] p-4 mb-6" style={{ background: 'var(--surface)' }}>
        <form onSubmit={handleSearchSubmit} className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="q" className="block text-xs font-medium mb-1.5 text-[var(--muted)]">Search</label>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
              <input
                id="q"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Name, email, or message text…"
                className="w-full rounded-lg border border-[var(--border)] pl-9 pr-3 py-2 text-sm bg-[var(--bg)] focus:border-[var(--signal)] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-xs font-medium mb-1.5 text-[var(--muted)]">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1) }}
              className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm bg-[var(--bg)] outline-none"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          <div>
            <label htmlFor="from" className="block text-xs font-medium mb-1.5 text-[var(--muted)]">From</label>
            <input
              id="from"
              type="date"
              value={from}
              onChange={(e) => { setFrom(e.target.value); setPage(1) }}
              className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm bg-[var(--bg)] outline-none"
            />
          </div>

          <div>
            <label htmlFor="to" className="block text-xs font-medium mb-1.5 text-[var(--muted)]">To</label>
            <input
              id="to"
              type="date"
              value={to}
              onChange={(e) => { setTo(e.target.value); setPage(1) }}
              className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm bg-[var(--bg)] outline-none"
            />
          </div>

          <div>
            <label htmlFor="sort" className="block text-xs font-medium mb-1.5 text-[var(--muted)]">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1) }}
              className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm bg-[var(--bg)] outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>

          <button
            type="submit"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-[var(--signal)] text-[var(--bg)]"
          >
            Apply
          </button>
        </form>
      </div>

      {error && (
        <p className="text-sm text-[var(--flare)] mb-4">{error}</p>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-[var(--muted)] text-sm py-16 justify-center">
          <Loader2 size={16} className="animate-spin" /> Loading {PAGE_SIZE_LABEL}…
        </div>
      ) : data.messages.length === 0 ? (
        <div className="text-center py-16 text-[var(--muted)] text-sm rounded-xl border border-[var(--border)]" style={{ background: 'var(--surface)' }}>
          No messages match these filters.
        </div>
      ) : (
        <div className="space-y-3">
          {data.messages.map((msg) => (
            <div
              key={msg._id}
              className="rounded-xl border p-5 transition-colors"
              style={{
                background: 'var(--surface)',
                borderColor: msg.read ? 'var(--border)' : 'var(--signal)',
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div>
                  <p className="font-medium">{msg.name}</p>
                  <a href={`mailto:${msg.email}`} className="text-sm text-[var(--muted)] hover:text-[var(--signal)]">
                    {msg.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-[var(--muted)]">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                  <button
                    onClick={() => toggleRead(msg)}
                    title={msg.read ? 'Mark as unread' : 'Mark as read'}
                    className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--signal)] hover:text-[var(--signal)] transition-colors"
                  >
                    {msg.read ? <MailOpen size={15} /> : <Mail size={15} />}
                  </button>
                  <button
                    onClick={() => remove(msg)}
                    title="Delete message"
                    className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--flare)] hover:text-[var(--flare)] transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-[var(--text)] leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="p-2 rounded-lg border border-[var(--border)] disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-[var(--muted)] font-mono">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="p-2 rounded-lg border border-[var(--border)] disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
