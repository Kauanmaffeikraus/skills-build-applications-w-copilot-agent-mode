import React, { useEffect, useState } from 'react';
import { fetchArray, apiBase } from '../lib/api';

export default function Users() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchArray('users').then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <p>API base: {apiBase}</p>
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
