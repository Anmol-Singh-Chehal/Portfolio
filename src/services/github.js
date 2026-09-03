// Connect this to the real GitHub REST API later — for example:
//   GET https://api.github.com/users/Anmol-Singh-Chehal/repos
// Never put a token in frontend code; if authenticated requests are
// needed, proxy them through a backend using api.js instead.

import { social } from '../data/social.js'

const GITHUB_USERNAME = social.github.split('/').pop()

/**
 * Attempts a live, unauthenticated fetch to the public GitHub API.
 * Falls back to `null` (handled by the calling component) if the
 * network request fails, so the UI never crashes without a backend.
 */
export async function fetchGithubProfile() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
    if (!res.ok) return null
    return await res.json()
  } catch (err) {
    console.warn('[github.js] Falling back — GitHub API unavailable:', err.message)
    return null
  }
}
