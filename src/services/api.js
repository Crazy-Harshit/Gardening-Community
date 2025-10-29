const BASE_URL = import.meta.env.VITE_API_BASE || '';

export async function apiFetch(path, opts = {}) {
  const res = await fetch(BASE_URL + path, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return null;
  return res.json();
}

export default { apiFetch };
