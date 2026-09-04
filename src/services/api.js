// Central place the whole app talks to the backend through — set
// API_BASE_URL in .env to point at a different deployment.

const BASE_URL = import.meta.env.API_BASE_URL;

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  let body = null
  try {
    body = await response.json()
  } catch {
    // No JSON body (e.g. a 204) — that's fine.
  }

  if (!response.ok) {
    const message = body?.error || `Request to ${path} failed with status ${response.status}`
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  return body
}
