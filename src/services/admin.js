import { apiRequest } from './api.js'

const TOKEN_KEY = 'admin_token'

export function getAdminToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY)
}

export async function adminLogin(id, password) {
  const data = await apiRequest('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ id, password }),
  })
  setAdminToken(data.token)
  return data
}

function authHeaders() {
  const token = getAdminToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function fetchMessages({ q = '', status = 'all', from = '', to = '', sort = 'newest', page = 1 } = {}) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (status && status !== 'all') params.set('status', status)
  if (from) params.set('from', from)
  if (to) params.set('to', to)
  params.set('sort', sort)
  params.set('page', String(page))

  return apiRequest(`/api/admin/messages?${params.toString()}`, {
    headers: authHeaders(),
  })
}

export async function markMessageRead(id, read) {
  return apiRequest(`/api/admin/messages/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ read }),
  })
}

export async function deleteMessage(id) {
  return apiRequest(`/api/admin/messages/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
}
