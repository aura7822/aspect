// Talks to the Aspect backend. In dev this goes through the Vite proxy
// (see vite.config.js) so requests are same-origin; in production, set
// VITE_API_URL to the backend's URL if it's on a different host, or leave it
// unset if both are served from the same domain behind a reverse proxy.

const API_BASE = import.meta.env.VITE_API_URL ?? ''

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

class ApiError extends Error {
  constructor(message, status, body) {
    super(message)
    this.status = status
    this.body = body
  }
}

async function request(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  // The CSRF cookie is intentionally not httpOnly (see backend
  // middleware/csrf.js) specifically so this can read it and echo it back —
  // that's what makes the double-submit check work. GET/HEAD are exempt on
  // the server side, so this only matters for mutating requests.
  if (method !== 'GET') {
    const csrfToken = getCookie('csrf_token')
    if (csrfToken) headers['X-CSRF-Token'] = csrfToken
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    credentials: 'include', // send/receive the httpOnly session cookie
    body: body ? JSON.stringify(body) : undefined,
  })

  const isJson = res.headers.get('content-type')?.includes('application/json')
  const data = isJson ? await res.json() : null

  if (!res.ok) {
    throw new ApiError(data?.error ?? `Request failed (${res.status})`, res.status, data)
  }
  return data
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  delete: (path) => request(path, { method: 'DELETE' }),
}

export { ApiError }
