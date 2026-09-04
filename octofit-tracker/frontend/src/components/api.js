const codespaceName = (import.meta.env.VITE_CODESPACE_NAME || '').trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export async function fetchResource(url, signal) {
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return response.json()
}

export function displayName(value) {
  if (!value) return 'Unknown athlete'
  if (typeof value === 'string') return value
  return value.displayName || value.username || value.name || 'Unknown athlete'
}

export function shortId(value) {
  return String(value?._id || value?.id || value || '').slice(-6)
}
