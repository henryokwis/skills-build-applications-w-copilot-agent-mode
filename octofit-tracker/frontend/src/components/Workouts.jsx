import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchResource, getItems } from './api.js'
import { ResourcePage } from './Activities.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => {
    const controller = new AbortController()
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` : `${apiBaseUrl}/api/workouts/`
    fetchResource(apiUrl, controller.signal).then((payload) => setWorkouts(getItems(payload))).catch((error) => { if (error.name !== 'AbortError') setState({ loading: false, error: error.message }) }).finally(() => setState((current) => ({ ...current, loading: false })))
    return () => controller.abort()
  }, [])
  return <ResourcePage eyebrow="READY WHEN YOU ARE" title="Workouts" description="A considered next step for every kind of day.">
    {state.loading && <p className="loading">Loading workouts...</p>}
    {state.error && <p className="error-message">Could not load workouts: {state.error}</p>}
    {!state.loading && !state.error && <div className="card-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id}><div className="workout-top"><span className="card-kicker">{workout.activityType || 'WORKOUT'}</span><span className="difficulty">{workout.difficulty || 'ANY LEVEL'}</span></div><h2>{workout.title}</h2><p>{workout.description}</p><strong>{workout.durationMinutes || 0} <small>MINUTES</small></strong></article>)}{!workouts.length && <p className="empty-state">No workouts have been added yet.</p>}</div>}
  </ResourcePage>
}

export default Workouts
