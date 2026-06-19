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
 * Returns full meetup details including participants.
 */
export async function getMeetupById(id: number | string) {
  return apiServer<Meetup>(`/api/meetups/${id}`);
}
