import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchResource, getItems } from './api.js'
import { ResourcePage } from './Activities.jsx'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => {
    const controller = new AbortController()
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/` : `${apiBaseUrl}/api/users/`
    fetchResource(apiUrl, controller.signal).then((payload) => setUsers(getItems(payload))).catch((error) => { if (error.name !== 'AbortError') setState({ loading: false, error: error.message }) }).finally(() => setState((current) => ({ ...current, loading: false })))
    return () => controller.abort()
  }, [])
  return <ResourcePage eyebrow="THE COMMUNITY" title="Athletes" description="Meet the people putting in the work.">
    {state.loading && <p className="loading">Loading athletes...</p>}
    {state.error && <p className="error-message">Could not load athletes: {state.error}</p>}
    {!state.loading && !state.error && <div className="card-grid">{users.map((user) => <article className="user-card" key={user._id || user.id}><div className="avatar avatar-large">{(user.displayName || user.username || '?').slice(0, 1)}</div><div><h2>{user.displayName || user.username}</h2><p>@{user.username}</p><span>{user.email}</span></div></article>)}{!users.length && <p className="empty-state">No athletes have joined yet.</p>}</div>}
  </ResourcePage>
}

export default Users
