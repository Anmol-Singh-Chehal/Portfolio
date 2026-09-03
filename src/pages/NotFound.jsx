import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page py-32 text-center">
      <p className="font-mono text-sm text-[var(--signal)] mb-4">404</p>
      <h1 className="font-display text-3xl font-semibold mb-4">Page not found</h1>
      <p className="text-[var(--muted)] mb-8">
        That page doesn&apos;t exist — it may have moved, or the link may be out of date.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-full bg-[var(--signal)] text-[var(--bg)]"
      >
        Back home
      </Link>
    </div>
  )
}
