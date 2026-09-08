import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { calculateBirthChart } from "./astrology";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

app.use(cors({ origin: ORIGIN }));
app.use(express.json());

const birthChartLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const birthChartSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "time must be HH:MM")
    .optional(),
  location: z.string().max(200).optional().default(""),
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.post(
  "/api/birth-chart",
  birthChartLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = birthChartSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
      }

      const result = await calculateBirthChart(parsed.data);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message = err instanceof Error ? err.message : "Unexpected server error";
  const status = /could not resolve location/i.test(message) ? 422 : 500;
  console.error("[cosmic-horoscope-server]", message);
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Cosmic Horoscope API listening on http://localhost:${PORT}`);
});
