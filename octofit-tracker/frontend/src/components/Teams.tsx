import React, { useEffect, useState } from 'react';
import { fetchArray, apiBase } from '../lib/api';

export default function Teams() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchArray('teams').then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      <p>API base: {apiBase}</p>
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
