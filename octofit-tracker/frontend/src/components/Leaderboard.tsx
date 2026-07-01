import React, { useEffect, useState } from 'react';
import { fetchArray, apiBase } from '../lib/api';

export default function Leaderboard() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // leaderboard endpoint might be /leaderboard or /leaderboard/top
    fetchArray('leaderboard').then((data) => {
      setItems(data.length ? data : []);
    }).catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <p>API base: {apiBase}</p>
      {items.length === 0 ? (
        <p>No leaderboard entries found.</p>
      ) : (
        <ol>
          {items.map((u) => (
            <li key={u._id || u.id || JSON.stringify(u)}>{u.name || u.username || JSON.stringify(u)} — {u.score ?? u.points ?? ''}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
