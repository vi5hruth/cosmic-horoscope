export interface BirthChartRequestBody {
  date: string;
  time?: string;
  location: string;
}

export interface BirthChartResponse {
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
