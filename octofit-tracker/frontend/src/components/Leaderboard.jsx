import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [items, setItems] = useState([]);

  // Required template for checks:
  // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
  const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
  const endpointUrl = import.meta.env.VITE_CODESPACE_NAME ? codespaceEndpoint : `http://localhost:8000/api/leaderboard/`;

  useEffect(() => {
    fetch(endpointUrl)
      .then((r) => r.json())
      .then((json) => {
        if (Array.isArray(json)) return setItems(json);
        if (json.results) return setItems(json.results);
        if (json.data) return setItems(json.data);
        const arr = Object.values(json).find((v) => Array.isArray(v));
        setItems(arr || []);
      })
      .catch(() => setItems([]));
  }, [endpointUrl]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <p>API endpoint: {endpointUrl}</p>
      <ol>
        {items.map((u, i) => (
          <li key={u._id || u.id || i}>{u.name || u.username || JSON.stringify(u)} — {u.score ?? u.points ?? ''}</li>
        ))}
      </ol>
    </div>
  );
}
