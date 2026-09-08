export type ZodiacElement = "Fire" | "Earth" | "Air" | "Water";
export type ReadingPeriod = "daily" | "weekly" | "monthly";

export interface CategoryRating {
  rating: number;
  meter: number;
  summary: string;
}

export interface HoroscopeReading {
  overview: string;
  luckyNumber: number;
  luckyColor: string;
  compatibility: string;
  mood: string;
  planetRuler: string;
  categories: {
    love: CategoryRating;
    career: CategoryRating;
    health: CategoryRating;
    wealth: CategoryRating;
  };
}

export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  dateRange: string;
  element: ZodiacElement;
  rulingPlanet: string;
  color: string;
  position: [number, number, number];
  traits: string[];
  readings: Record<ReadingPeriod, HoroscopeReading>;
}
