import React, { useEffect, useState } from 'react';
import { fetchArray, apiBase } from '../lib/api';

export default function Workouts() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchArray('workouts').then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <p>API base: {apiBase}</p>
      {items.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <ul>
          {items.map((w) => (
            <li key={w._id || w.id || JSON.stringify(w)}>{w.title || w.name || JSON.stringify(w)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
