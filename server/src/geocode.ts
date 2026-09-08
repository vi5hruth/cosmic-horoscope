interface GeocodeResult {
  name: string;
  latitude: number;
  longitude: number;
}

export async function geocodeLocation(location: string): Promise<GeocodeResult> {
  const trimmed = location.trim();

  if (!trimmed) {
    return { name: "Greenwich, UK (default)", latitude: 51.4769, longitude: -0.0005 };
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    trimmed,
  )}&count=1&language=en&format=json`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Geocoding service unavailable");
  }

  const data = (await res.json()) as {
    results?: { name: string; latitude: number; longitude: number; country?: string }[];
  };

  const top = data.results?.[0];
  if (!top) {
    throw new Error(`Could not resolve location: "${location}"`);
  }

  return {
    name: top.country ? `${top.name}, ${top.country}` : top.name,
    latitude: top.latitude,
    longitude: top.longitude,
  };
}
