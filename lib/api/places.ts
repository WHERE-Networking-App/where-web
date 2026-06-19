/**
 * lib/api/places.ts
 *
 * CLIENT-SIDE API request functions for /api/places/* endpoints.
 * Uses apiClient — safe to import from "use client" components.
 *
 * For server-side fetching, use lib/api/places.server.ts.
 */

import { apiClient } from "@/lib/api-client";
import type { CreatePlaceRequest, Place, PlaceQuery } from "@/lib/types";

/**
 * GET /api/places (client-side, for real-time search)
 * Fetches places optionally filtered by city and search term.
 * Designed for use in the PlacePicker client component.
 */
export async function searchPlaces(query?: PlaceQuery) {
  const params = new URLSearchParams();
  if (query?.city) params.set("city", query.city);
  if (query?.search) params.set("search", query.search);

  const qs = params.toString();
  return apiClient<Place[]>(`/api/places${qs ? `?${qs}` : ""}`, {
    authenticated: false,
  });
}

/**
 * POST /api/places
 * Creates a new place. Requires authentication.
 */
export async function createPlaceApi(body: CreatePlaceRequest) {
  return apiClient<{ message: string; place: Place }>("/api/places", {
    method: "POST",
    body,
    authenticated: true,
  });
}
