import type { ZodiacSign, ReadingPeriod, HoroscopeReading } from "@/types/zodiac";

function wheelPosition(index: number, radius = 6.2): [number, number, number] {
  const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = Math.sin(angle * 2) * 0.4;
  return [x, y, z];
}

function makeReading(
  overview: string,
  luckyNumber: number,
  luckyColor: string,
  compatibility: string,
  mood: string,
  planetRuler: string,
  ratings: [number, number, number, number],
): HoroscopeReading {
  const [love, career, health, wealth] = ratings;
  const meter = (r: number) => Math.round((r / 5) * 100);
  return {
    overview,
    luckyNumber,
    luckyColor,
    compatibility,
    mood,
    planetRuler,
    categories: {
      love: { rating: love, meter: meter(love), summary: "Connection and vulnerability take center stage." },
      career: { rating: career, meter: meter(career), summary: "Focus and initiative pay off at work." },
      health: { rating: health, meter: meter(health), summary: "Listen to your body's rhythm today." },
      wealth: { rating: wealth, meter: meter(wealth), summary: "Steady decisions protect your resources." },
    },
  };
}

export const zodiacSigns: ZodiacSign[] = [
  {
    id: "aries", name: "Aries", symbol: "♈", dateRange: "Mar 21 – Apr 19", element: "Fire",
    rulingPlanet: "Mars", color: "#FF5A4E", position: wheelPosition(0),
    traits: ["Bold", "Impulsive", "Pioneering"],
    readings: {
      daily: makeReading("A surge of Mars energy pushes you to start something you've been circling for weeks.", 9, "Crimson Red", "Leo", "Determined", "Mars", [3, 4, 4, 3]),
      weekly: makeReading("Momentum builds midweek; a rival's move becomes an unexpected opportunity.", 14, "Burnt Orange", "Sagittarius", "Restless", "Mars", [3, 4, 3, 3]),
      monthly: makeReading("This is a month of first drafts, not final answers — begin without waiting for permission.", 27, "Crimson Red", "Leo", "Energized", "Mars", [4, 4, 3, 3]),
    },
  },
  {
    id: "taurus", name: "Taurus", symbol: "♉", dateRange: "Apr 20 – May 20", element: "Earth",
    rulingPlanet: "Venus", color: "#7ED957", position: wheelPosition(1),
    traits: ["Grounded", "Sensual", "Persistent"],
    readings: {
      daily: makeReading("Venus favors slow, tactile pleasures today — good food, good textures, unhurried company.", 6, "Emerald Green", "Capricorn", "Content", "Venus", [4, 3, 4, 4]),
      weekly: makeReading("A financial decision you've been postponing finally has enough information to make.", 21, "Sage Green", "Virgo", "Steady", "Venus", [3, 3, 4, 4]),
      monthly: makeReading("Comfort is earned this month through consistency rather than shortcuts.", 12, "Rose Gold", "Cancer", "Grounded", "Venus", [4, 4, 4, 5]),
    },
  },
  {
    id: "gemini", name: "Gemini", symbol: "♊", dateRange: "May 21 – Jun 20", element: "Air",
    rulingPlanet: "Mercury", color: "#FFD966", position: wheelPosition(2),
    traits: ["Curious", "Witty", "Adaptable"],
    readings: {
      daily: makeReading("Two conversations collide today and hand you information you didn't know you needed.", 5, "Butter Yellow", "Libra", "Chatty", "Mercury", [3, 4, 3, 3]),
      weekly: makeReading("Your calendar gets crowded — protect one evening for something with no agenda.", 18, "Sky Blue", "Aquarius", "Scattered", "Mercury", [3, 4, 3, 3]),
      monthly: makeReading("Ideas multiply faster than you can act on them; keep a running list rather than chasing every one.", 30, "Butter Yellow", "Libra", "Curious", "Mercury", [3, 4, 3, 3]),
    },
  },
  {
    id: "cancer", name: "Cancer", symbol: "♋", dateRange: "Jun 21 – Jul 22", element: "Water",
    rulingPlanet: "Moon", color: "#9FB8FF", position: wheelPosition(3),
    traits: ["Nurturing", "Intuitive", "Protective"],
    readings: {
      daily: makeReading("The Moon heightens memory today — an old feeling resurfaces asking to be resolved, not relived.", 2, "Silver", "Scorpio", "Reflective", "Moon", [4, 3, 3, 3]),
      weekly: makeReading("Home takes priority; a small repair or reorganizing project restores a sense of control.", 16, "Pearl White", "Pisces", "Tender", "Moon", [4, 3, 3, 3]),
      monthly: makeReading("Emotional tides are strong but not dangerous — let them move through instead of damming them.", 24, "Silver", "Taurus", "Sensitive", "Moon", [4, 3, 4, 3]),
    },
  },
  {
    id: "leo", name: "Leo", symbol: "♌", dateRange: "Jul 23 – Aug 22", element: "Fire",
    rulingPlanet: "Sun", color: "#FFB347", position: wheelPosition(4),
    traits: ["Confident", "Generous", "Dramatic"],
    readings: {
      daily: makeReading("You're the gravitational center of any room you enter today — use the spotlight to lift someone else too.", 1, "Royal Gold", "Aries", "Radiant", "Sun", [4, 4, 3, 4]),
      weekly: makeReading("Recognition arrives for work you did quietly — accept the credit without over-explaining.", 19, "Amber", "Sagittarius", "Proud", "Sun", [4, 4, 3, 4]),
      monthly: makeReading("Leadership opportunities multiply; the challenge is choosing which one deserves your full performance.", 8, "Royal Gold", "Gemini", "Confident", "Sun", [4, 5, 3, 4]),
    },
  },
  {
    id: "virgo", name: "Virgo", symbol: "♍", dateRange: "Aug 23 – Sep 22", element: "Earth",
    rulingPlanet: "Mercury", color: "#B7C9A8", position: wheelPosition(5),
    traits: ["Meticulous", "Analytical", "Devoted"],
    readings: {
      daily: makeReading("A detail everyone else missed is exactly why your fix works today.", 14, "Sage", "Taurus", "Precise", "Mercury", [3, 4, 4, 4]),
      weekly: makeReading("Systems you built weeks ago start paying dividends — resist the urge to rebuild them again.", 22, "Slate Gray", "Capricorn", "Methodical", "Mercury", [3, 4, 4, 4]),
      monthly: makeReading("This month rewards refinement over reinvention — polish what already works.", 11, "Sage", "Pisces", "Diligent", "Mercury", [3, 4, 4, 5]),
    },
  },
  {
    id: "libra", name: "Libra", symbol: "♎", dateRange: "Sep 23 – Oct 22", element: "Air",
    rulingPlanet: "Venus", color: "#F3B0C3", position: wheelPosition(6),
    traits: ["Diplomatic", "Charming", "Fair-minded"],
    readings: {
      daily: makeReading("A decision that felt like a stalemate finds its balance once you name what you actually want.", 7, "Blush Pink", "Gemini", "Harmonious", "Venus", [4, 3, 3, 3]),
      weekly: makeReading("Partnership conversations — business or romantic — move from polite to real.", 20, "Powder Blue", "Aquarius", "Diplomatic", "Venus", [4, 3, 3, 3]),
      monthly: makeReading("Fairness matters more to you than winning this month, and it earns you real trust.", 3, "Blush Pink", "Leo", "Balanced", "Venus", [4, 3, 3, 4]),
    },
  },
  {
    id: "scorpio", name: "Scorpio", symbol: "♏", dateRange: "Oct 23 – Nov 21", element: "Water",
    rulingPlanet: "Pluto", color: "#8B1E3F", position: wheelPosition(7),
    traits: ["Intense", "Strategic", "Magnetic"],
    readings: {
      daily: makeReading("You sense the subtext under a conversation today — trust it, but choose when to name it.", 13, "Deep Maroon", "Cancer", "Perceptive", "Pluto", [4, 4, 3, 4]),
      weekly: makeReading("Something hidden comes to light; it changes less than you fear and clarifies more than you expect.", 4, "Obsidian Black", "Pisces", "Transformative", "Pluto", [4, 4, 3, 4]),
      monthly: makeReading("Endings this month clear space for a version of your life with fewer compromises.", 17, "Deep Maroon", "Virgo", "Resolute", "Pluto", [4, 4, 3, 5]),
    },
  },
  {
    id: "sagittarius", name: "Sagittarius", symbol: "♐", dateRange: "Nov 22 – Dec 21", element: "Fire",
    rulingPlanet: "Jupiter", color: "#C77DFF", position: wheelPosition(8),
    traits: ["Adventurous", "Optimistic", "Blunt"],
    readings: {
      daily: makeReading("A spontaneous plan today teaches you more than the careful one would have.", 9, "Violet", "Aries", "Adventurous", "Jupiter", [3, 3, 4, 3]),
      weekly: makeReading("Travel, study, or a long-distance connection expands your sense of what's possible.", 26, "Turquoise", "Leo", "Expansive", "Jupiter", [3, 4, 4, 3]),
      monthly: makeReading("Your honesty lands better than usual this month — people are ready to hear it.", 15, "Violet", "Libra", "Optimistic", "Jupiter", [3, 4, 4, 3]),
    },
  },
  {
    id: "capricorn", name: "Capricorn", symbol: "♑", dateRange: "Dec 22 – Jan 19", element: "Earth",
    rulingPlanet: "Saturn", color: "#6E7B8B", position: wheelPosition(9),
    traits: ["Disciplined", "Ambitious", "Patient"],
    readings: {
      daily: makeReading("Saturn rewards the boring work today — the unglamorous task is the one that compounds.", 10, "Charcoal", "Taurus", "Focused", "Saturn", [3, 5, 3, 4]),
      weekly: makeReading("A structure you've been building shows its first visible results — keep the foundation unhurried.", 23, "Onyx", "Virgo", "Resilient", "Saturn", [3, 5, 3, 4]),
      monthly: makeReading("Authority — earned, not given — becomes yours this month if you keep showing up.", 31, "Charcoal", "Scorpio", "Ambitious", "Saturn", [3, 5, 3, 5]),
    },
  },
  {
    id: "aquarius", name: "Aquarius", symbol: "♒", dateRange: "Jan 20 – Feb 18", element: "Air",
    rulingPlanet: "Uranus", color: "#5CC8FF", position: wheelPosition(10),
    traits: ["Visionary", "Independent", "Unconventional"],
    readings: {
      daily: makeReading("An unconventional idea you almost dismissed turns out to be the right one today.", 11, "Electric Blue", "Gemini", "Inventive", "Uranus", [3, 4, 3, 3]),
      weekly: makeReading("A community or group project needs your outside perspective more than your consensus.", 29, "Ice Blue", "Libra", "Detached", "Uranus", [3, 4, 3, 3]),
      monthly: makeReading("Independence and belonging stop feeling like opposites this month.", 6, "Electric Blue", "Sagittarius", "Visionary", "Uranus", [3, 4, 3, 4]),
    },
  },
  {
    id: "pisces", name: "Pisces", symbol: "♓", dateRange: "Feb 19 – Mar 20", element: "Water",
    rulingPlanet: "Neptune", color: "#8AF5D0", position: wheelPosition(11),
    traits: ["Empathetic", "Imaginative", "Dreamy"],
    readings: {
      daily: makeReading("Neptune blurs the line between intuition and wishful thinking today — check one against the other.", 7, "Seafoam", "Scorpio", "Dreamy", "Neptune", [4, 3, 3, 3]),
      weekly: makeReading("Creative work flows easily; a stalled project finds its missing piece almost by accident.", 25, "Aqua", "Cancer", "Inspired", "Neptune", [4, 3, 3, 3]),
      monthly: makeReading("Compassion is your strength this month, but keep one boundary firm to protect it.", 20, "Seafoam", "Capricorn", "Empathetic", "Neptune", [4, 3, 4, 3]),
    },
  },
];

export function getSignById(id: string): ZodiacSign | undefined {
  return zodiacSigns.find((s) => s.id === id);
}

export function getReading(signId: string, period: ReadingPeriod) {
  return getSignById(signId)?.readings[period];
}

const periods: ReadingPeriod[] = ["daily", "weekly", "monthly"];
export { periods as READING_PERIODS };
