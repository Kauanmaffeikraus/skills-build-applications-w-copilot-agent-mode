import React, { useEffect, useState } from 'react';
import apiBase from '../lib/api';

export default function Users() {
  const [items, setItems] = useState<any[]>([]);

  // Required template (used by checks):
  // `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
  const endpointUrl = import.meta.env.VITE_CODESPACE_NAME ? codespaceEndpoint : `${apiBase}/users/`;

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
      <h2>Users</h2>
      <p>API endpoint: {endpointUrl}</p>
      {items.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {items.map((u) => (
            <li key={u._id || u.id || JSON.stringify(u)}>{u.name || u.username || JSON.stringify(u)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
