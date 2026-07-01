import React, { useEffect, useState } from 'react';
import { fetchArray, apiBase } from '../lib/api';

export default function Activities() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchArray('activities').then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <p>API base: {apiBase}</p>
      {items.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <ul>
          {items.map((a) => (
            <li key={a._id || a.id || JSON.stringify(a)}>
              {a.type || a.name || JSON.stringify(a)} - {a.duration || a.distance || ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
