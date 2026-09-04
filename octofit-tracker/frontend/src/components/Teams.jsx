import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchResource, getItems } from './api.js'
import { ResourcePage } from './Activities.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => {
    const controller = new AbortController()
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/` : `${apiBaseUrl}/api/teams/`
    fetchResource(apiUrl, controller.signal).then((payload) => setTeams(getItems(payload))).catch((error) => { if (error.name !== 'AbortError') setState({ loading: false, error: error.message }) }).finally(() => setState((current) => ({ ...current, loading: false })))
    return () => controller.abort()
  }, [])
  return <ResourcePage eyebrow="YOUR PEOPLE" title="Teams" description="The groups that turn consistency into momentum.">
    {state.loading && <p className="loading">Loading teams...</p>}
    {state.error && <p className="error-message">Could not load teams: {state.error}</p>}
    {!state.loading && !state.error && <div className="card-grid">{teams.map((team) => <article className="team-card" key={team._id || team.id}><span className="card-kicker">TEAM</span><h2>{team.name}</h2><p>{team.description || 'A team ready to move together.'}</p><span className="member-count">{team.members?.length || 0} members</span></article>)}{!teams.length && <p className="empty-state">No teams have been created yet.</p>}</div>}
  </ResourcePage>
}

export default Teams
