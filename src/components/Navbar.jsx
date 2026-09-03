import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { social } from '../data/social.js'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'
  const active = useActiveSection(onHome ? LINKS.map((l) => l.id) : [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const goToSection = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      requestAnimationFrame(() => {
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
      })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--border)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="container-page flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          className="font-display font-semibold text-lg tracking-tight text-[var(--text)] flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--signal)]" aria-hidden="true" />
          Anmol Singh
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.id} className="relative">
              <a
                href={`/#${link.id}`}
                onClick={goToSection(link.id)}
                className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors py-2"
              >
                {link.label}
              </a>
              {onHome && active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[var(--signal)] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={social.resume}
            download
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-[var(--border)] text-[var(--text)] hover:border-[var(--signal)] hover:text-[var(--signal)] transition-colors"
          >
            <Download size={15} /> Resume
          </a>
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="p-2 rounded-full text-[var(--text)]"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]"
          >
            <ul className="container-page py-4 flex flex-col gap-1">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    onClick={goToSection(link.id)}
                    className="block py-3 text-base font-medium text-[var(--text)] border-b border-[var(--border)] last:border-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href={social.resume}
                  download
                  className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full bg-[var(--signal)] text-[var(--bg)]"
                >
                  <Download size={15} /> Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
