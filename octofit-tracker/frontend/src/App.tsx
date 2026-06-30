import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to OctoFit Tracker</h1>
      <p>Modern multi-tier fitness tracking with React, Express, and MongoDB.</p>
    </div>
  );
}

export default App;
