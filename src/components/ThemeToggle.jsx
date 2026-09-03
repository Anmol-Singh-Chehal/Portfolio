import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.js'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text)] hover:border-[var(--signal)] transition-colors overflow-hidden"
    >
      <span
        className="transition-transform duration-300"
        style={{ transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)' }}
      >
        {theme === 'dark' ? <Moon size={17} /> : <Sun size={17} />}
      </span>
    </button>
  )
}
