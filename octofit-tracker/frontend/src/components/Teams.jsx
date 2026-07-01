import React, { useEffect, useState } from 'react';

export default function Teams() {
  const [items, setItems] = useState([]);

  // Required template for checks:
  // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
  const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
  const endpointUrl = import.meta.env.VITE_CODESPACE_NAME ? codespaceEndpoint : `http://localhost:8000/api/teams/`;

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
      <h2>Teams</h2>
      <p>API endpoint: {endpointUrl}</p>
      <ul>
        {items.map((t, i) => (
          <li key={t._id || t.id || i}>{t.name || JSON.stringify(t)}</li>
        ))}
      </ul>
    </div>
  );
}
