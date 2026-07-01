import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Activities from './components/Activities';
import Users from './components/Users';
import Teams from './components/Teams';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/activities">Activities</Link>
            <Link className="nav-link" to="/workouts">Workouts</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
