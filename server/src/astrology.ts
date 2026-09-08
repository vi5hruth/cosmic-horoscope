import { Origin, Horoscope } from "circular-natal-horoscope-js";
import { geocodeLocation } from "./geocode";
import type { BirthChartRequestBody, BirthChartResponse } from "./types";

export async function calculateBirthChart(
  body: BirthChartRequestBody,
): Promise<BirthChartResponse> {
  const [year, month, day] = body.date.split("-").map(Number);
  if (!year || !month || !day) {
    throw new Error("Invalid date — expected YYYY-MM-DD");
  }

  const hasTime = Boolean(body.time);
  const [hour, minute] = hasTime ? body.time!.split(":").map(Number) : [12, 0];

  const place = await geocodeLocation(body.location ?? "");

  const origin = new Origin({
    year,
    month: month - 1,
    date: day,
    hour: hour ?? 12,
    minute: minute ?? 0,
    latitude: place.latitude,
    longitude: place.longitude,
  });

  const horoscope = new Horoscope({
    origin,
    houseSystem: "whole-sign",
    zodiac: "tropical",
    aspectPoints: ["bodies"],
    aspectWithPoints: ["bodies"],
    aspectTypes: ["major"],
    language: "en",
  });

  return {
    sun: horoscope.CelestialBodies.sun.Sign.key,
    moon: horoscope.CelestialBodies.moon.Sign.key,
    rising: horoscope.Ascendant.Sign.key,
    resolvedLocation: place,
    approximateRising: !hasTime,
  };
}
