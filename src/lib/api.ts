const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export interface BirthChartApiResponse {
  sun: string;
  moon: string;
  rising: string;
  resolvedLocation: {
    name: string;
    latitude: number;
    longitude: number;
  };
  approximateRising: boolean;
}

interface BirthChartRequest {
  date: string;
  time?: string;
  location: string;
}

export async function fetchBirthChart(payload: BirthChartRequest): Promise<BirthChartApiResponse> {
  const res = await fetch(`${API_BASE_URL}/api/birth-chart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: payload.date,
      time: payload.time || undefined,
      location: payload.location,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message =
      (typeof body?.error === "string" ? body.error : null) ??
      "Couldn't reach the chart service. Is the backend running?";
    throw new Error(message);
  }

  return res.json();
}
