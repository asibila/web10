export const API_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:3000"
).replace(/\/+$/, "");

export interface OpenCodeHealth {
  ok: boolean;
  url: string;
  version?: string;
  error?: string;
}

export interface ApiHealth {
  status: string;
  service: string;
  opencode: OpenCodeHealth;
}

export async function getApiHealth(): Promise<ApiHealth | null> {
  try {
    const response = await fetch(`${API_URL}/api/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as ApiHealth;
  } catch {
    return null;
  }
}
