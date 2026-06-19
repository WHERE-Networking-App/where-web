"use server";

/**
 * lib/actions/place-actions.ts
 *
 * Next.js Server Actions for place operations.
 * These server actions validate input with zod before forwarding
 * to the API layer in lib/api/places.ts.
 */

import { revalidatePath } from "next/cache";
import { getPlaces, getPlaceById } from "@/lib/api/places.server";
import { apiServer } from "@/lib/api-server";
import type { Place, PlaceQuery, CreatePlaceRequest } from "@/lib/types";
import type { ApiResponse } from "@/lib/types";
import { CreatePlaceSchema, PlaceQuerySchema } from "@/lib/validations/place";

/**
 * Server Action: Fetch all places, with optional city/search filters.
 * No authentication required.
 *
 * @param query - Optional { city?, search? }
 */
export async function getPlacesAction(
  query?: PlaceQuery,
): Promise<ApiResponse<Place[]>> {
  // Validate query params
  const parsed = PlaceQuerySchema.safeParse(query ?? {});
  if (!parsed.success) {
    return { data: null, error: "Invalid query parameters" };
  }

  return getPlaces(parsed.data);
}

/**
 * Server Action: Fetch a single place by ID.
 * No authentication required.
 *
 * @param id - The place ID
 */
export async function getPlaceByIdAction(
  id: number | string,
): Promise<ApiResponse<Place>> {
  return getPlaceById(id);
}

/**
 * Server Action: Create a new place.
 * Requires authentication (reads JWT from cookie via apiServer).
 *
 * @param data - The place data to create
 */
export async function createPlaceAction(
  data: unknown,
): Promise<ApiResponse<{ message: string; place: Place }>> {
  // Validate input with zod before calling the API
  const parsed = CreatePlaceSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = Object.values(
      parsed.error.flatten().fieldErrors,
    )[0]?.[0];
    return { data: null, error: firstError ?? "Validation failed" };
  }

  const result = await apiServer<{ message: string; place: Place }>(
    "/api/places",
    { method: "POST", body: parsed.data as CreatePlaceRequest },
  );

  if (!result.error) {
    revalidatePath("/dashboard");
  }

  return result;
}
