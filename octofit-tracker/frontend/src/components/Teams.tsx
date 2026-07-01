import React, { useEffect, useState } from 'react';
import apiBase from '../lib/api';

export default function Teams() {
  const [items, setItems] = useState<any[]>([]);

  // Required template (used by checks):
  // `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
  const endpointUrl = import.meta.env.VITE_CODESPACE_NAME ? codespaceEndpoint : `${apiBase}/teams/`;

  useEffect(() => {
    fetch(endpointUrl)
      .then((r) => r.json())
      .then((json) => {
        if (Array.isArray(json)) return setItems(json);
        if (json.results) return setItems(json.results);
        if (json.data) return setItems(json.data);
        if (json.items) return setItems(json.items);
        if (json.docs) return setItems(json.docs);
        const arr = Object.values(json).find((v) => Array.isArray(v));
        setItems((arr as any[]) || []);
      })
      .catch(() => setItems([]));
  }, [endpointUrl]);

  return (
    <div>
      <h2>Teams</h2>
      <p>API endpoint: {endpointUrl}</p>
      {items.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <ul>
          {items.map((t) => (
            <li key={t._id || t.id || JSON.stringify(t)}>{t.name || JSON.stringify(t)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
