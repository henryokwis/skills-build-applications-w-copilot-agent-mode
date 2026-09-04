import { useEffect, useState } from 'react'
import { apiBaseUrl, displayName, fetchResource, getItems } from './api.js'
import { ResourcePage } from './Activities.jsx'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
      : `${apiBaseUrl}/api/leaderboard/`
    fetchResource(apiUrl, controller.signal).then((payload) => setLeaders(getItems(payload))).catch((error) => {
      if (error.name !== 'AbortError') setState({ loading: false, error: error.message })
    }).finally(() => setState((current) => ({ ...current, loading: false })))
    return () => controller.abort()
  }, [])

  return <ResourcePage eyebrow="THE DAILY RACE" title="Leaderboard" description="Small wins add up. See who is setting the pace.">
    {state.loading && <p className="loading">Loading rankings...</p>}
    {state.error && <p className="error-message">Could not load leaderboard: {state.error}</p>}
    {!state.loading && !state.error && <div className="leaderboard-list">{leaders.sort((a, b) => (b.points || 0) - (a.points || 0)).map((leader, index) => <article className={`leader-row rank-${index + 1}`} key={leader._id || leader.id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><div className="avatar">{displayName(leader.userId).slice(0, 1)}</div><div className="row-main"><strong>{displayName(leader.userId)}</strong><span>{leader.activitiesCompleted || 0} activities completed</span></div><strong className="points">{leader.points || 0}<small> PTS</small></strong></article>)}{!leaders.length && <p className="empty-state">No leaderboard entries yet.</p>}</div>}
  </ResourcePage>
}

export default Leaderboard
