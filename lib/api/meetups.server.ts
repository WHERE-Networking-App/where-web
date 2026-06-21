/**
 * lib/api/meetups.server.ts
 *
 * SERVER-SIDE API request functions for /api/meetups/* endpoints.
 * Uses apiServer which reads the JWT from next/headers cookies.
 * Only import this from Server Components or Server Actions ("use server").
 *
 * For client-side mutations (join, leave, cancel, reach), use lib/api/meetups.ts.
 */

import { apiServer } from "@/lib/api-server";
import type { Meetup, UpComingMeetup } from "@/lib/types";

/**
 * GET /api/meetups/upcoming
 * Returns the list of upcoming meetups.
 */
export async function getUpcomingMeetups() {
  return apiServer<{ meetups: UpComingMeetup[] }>("/api/meetups/upcoming");
}

/**
 * GET /api/meetups/{id}
 * The API wraps the meetup in { meetup: {...} }.
 * This function unwraps it so callers get ApiResponse<Meetup> directly.
 */
export async function getMeetupById(id: number | string) {
  const res = await apiServer<{ meetup: Meetup }>(`/api/meetups/${id}`);
  if (res.error || !res.data) return { data: null, error: res.error };
  return { data: res.data.meetup, error: null };
}
