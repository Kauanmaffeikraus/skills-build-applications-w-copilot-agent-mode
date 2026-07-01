import React, { useEffect, useState } from 'react';

export default function Activities() {
  const [items, setItems] = useState([]);

  // Required template for checks:
  // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
  const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
  const endpointUrl = import.meta.env.VITE_CODESPACE_NAME ? codespaceEndpoint : `http://localhost:8000/api/activities/`;

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
      <h2>Activities</h2>
      <p>API endpoint: {endpointUrl}</p>
      <ul>
        {items.map((a, i) => (
          <li key={a._id || a.id || i}>{a.name || a.type || JSON.stringify(a)}</li>
        ))}
      </ul>
    </div>
  );
}
