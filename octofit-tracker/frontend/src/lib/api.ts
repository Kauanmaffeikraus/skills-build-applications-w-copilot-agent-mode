const codespace = import.meta.env.VITE_CODESPACE_NAME;
const port = 8000;

export const apiBase = codespace
  ? `https://${codespace}-${port}.app.github.dev/api`
  : `http://localhost:${port}/api`;

export async function fetchArray(endpoint: string) {
  const res = await fetch(`${apiBase}/${endpoint}`);
  const json = await res.json();

  if (Array.isArray(json)) return json;

  // Common pagination wrappers
  if (json.results) return json.results;
  if (json.data) return json.data;
  if (json.items) return json.items;
  if (json.docs) return json.docs;

  // Fallback: try to find array-like property
  const arr = Object.values(json).find((v) => Array.isArray(v));
  if (arr) return arr as any[];

  return [];
}

export default apiBase;
