import { apiRequest } from './api.js'

/**
 * Sends a contact form submission to the backend, which stores it in
 * MongoDB Atlas. See server/src/routes/contact.js.
 */
export async function sendMessage(formData) {
  try {
    await apiRequest('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    return { ok: true }
  } catch (err) {
    console.error('[contact.js] failed to send message:', err.message)
    return { ok: false, error: err.message }
  }
}
