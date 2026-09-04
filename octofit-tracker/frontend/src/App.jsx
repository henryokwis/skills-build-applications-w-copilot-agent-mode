import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  ['/', 'Overview'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Users'],
  ['/workouts', 'Workouts'],
]

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">OCTOFIT / TRAINING HQ</p>
      <h1>Make your next move count.</h1>
      <p className="lead">
        One clear view of your team, your activity, and the momentum you are building together.
      </p>
      <div className="overview-grid">
        <NavLink className="feature-tile feature-tile--green" to="/activities">
          <span className="tile-index">01</span>
          <strong>Log the work</strong>
          <span>See every session in one place.</span>
        </NavLink>
        <NavLink className="feature-tile feature-tile--orange" to="/leaderboard">
          <span className="tile-index">02</span>
          <strong>Find your pace</strong>
          <span>Track the points that keep you moving.</span>
        </NavLink>
        <NavLink className="feature-tile feature-tile--blue" to="/workouts">
          <span className="tile-index">03</span>
          <strong>Choose a challenge</strong>
          <span>Pick a workout that fits today.</span>
        </NavLink>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>OctoFit <em>Tracker</em></span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <span className="status-dot"><i /> API connected</span>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer>OCTOFIT TRACKER <span>BUILDING BETTER HABITS, TOGETHER</span></footer>
    </div>
  )
}

export default App
