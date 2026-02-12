const rawApiBaseUrl = import.meta.env.VITE_API_URL;
const defaultApiBaseUrl = "http://localhost:3000";

export const API_BASE_URL = (rawApiBaseUrl || defaultApiBaseUrl).replace(/\/+$/, "");

export function getApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
