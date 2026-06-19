import { z } from "zod";

// ─── Create Place ─────────────────────────────────────────────────────────────

export const CreatePlaceSchema = z.object({
  name: z.string().min(1, "Place name is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().optional(),
  latitude: z
    .number({ error: "Latitude must be a number" })
    .min(-90, "Latitude must be >= -90")
    .max(90, "Latitude must be <= 90")
    .optional(),
  longitude: z
    .number({ error: "Longitude must be a number" })
    .min(-180, "Longitude must be >= -180")
    .max(180, "Longitude must be <= 180")
    .optional(),
  place_type: z.string().optional(),
  description: z.string().optional(),
  rating: z
    .number({ error: "Rating must be a number" })
    .min(0, "Rating must be >= 0")
    .max(5, "Rating must be <= 5")
    .optional(),
});

// ─── Place Query (GET /api/places) ────────────────────────────────────────────

export const PlaceQuerySchema = z.object({
  city: z.string().optional(),
  search: z.string().optional(),
});

// ─── Inferred types ───────────────────────────────────────────────────────────

export type CreatePlaceInput = z.infer<typeof CreatePlaceSchema>;
export type PlaceQueryInput = z.infer<typeof PlaceQuerySchema>;
