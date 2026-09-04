import { useEffect, useState } from 'react'
import { apiBaseUrl, displayName, fetchResource, getItems } from './api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
      : `${apiBaseUrl}/api/activities/`

    fetchResource(apiUrl, controller.signal)
      .then((payload) => setActivities(getItems(payload)))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ loading: false, error: error.message })
      })
      .finally(() => setState((current) => ({ ...current, loading: false })))
    return () => controller.abort()
  }, [])

  return (
    <ResourcePage eyebrow="MOVEMENT LOG" title="Activities" description="The sessions that make progress visible.">
      {state.loading && <p className="loading">Loading activity feed...</p>}
      {state.error && <p className="error-message">Could not load activities: {state.error}</p>}
      {!state.loading && !state.error && (
        <div className="data-list">
          {activities.map((activity) => (
            <article className="data-row" key={activity._id || activity.id}>
              <div className="row-icon">{activity.type?.slice(0, 2).toUpperCase() || 'GO'}</div>
              <div className="row-main"><strong>{activity.type || 'Activity'}</strong><span>{displayName(activity.userId)}{activity.notes ? ` / ${activity.notes}` : ''}</span></div>
              <div className="row-stat"><strong>{activity.durationMinutes || 0} min</strong><span>{activity.distance ? `${activity.distance} km` : 'Distance n/a'}</span></div>
              <time>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Recently'}</time>
            </article>
          ))}
          {!activities.length && <p className="empty-state">No activities have been logged yet.</p>}
        </div>
      )}
    </ResourcePage>
  )
}

function ResourcePage({ eyebrow, title, description, children }) {
  return <section className="resource-page"><p className="eyebrow">{eyebrow}</p><div className="page-heading"><div><h1>{title}</h1><p className="lead">{description}</p></div><span className="record-label">LIVE DATA</span></div>{children}</section>
}

export default Activities
export { ResourcePage }
