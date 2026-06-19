/**
 * lib/api/places.server.ts
 *
 * SERVER-SIDE API request functions for /api/places/* endpoints.
 * Uses apiServer which reads the JWT from next/headers cookies.
 * Only import this from Server Components or Server Actions ("use server").
 *
 * For client-side search, use lib/api/places.ts (searchPlaces).
 */

import { apiServer } from "@/lib/api-server";
import type { Place, PlaceQuery } from "@/lib/types";

/**
 * GET /api/places
 * Returns a list of places, optionally filtered by city and/or search term.
 */
export async function getPlaces(query?: PlaceQuery) {
  const params = new URLSearchParams();
  if (query?.city) params.set("city", query.city);
  if (query?.search) params.set("search", query.search);

  const qs = params.toString();
  return apiServer<Place[]>(`/api/places${qs ? `?${qs}` : ""}`);
}

/**
 * GET /api/places/{id}
 * Returns a single place by ID.
 */
export async function getPlaceById(id: number | string) {
  return apiServer<Place>(`/api/places/${id}`);
}
