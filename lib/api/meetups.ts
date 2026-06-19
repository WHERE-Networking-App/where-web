/**
 * lib/api/meetups.ts
 *
 * CLIENT-SIDE API request functions for /api/meetups/* endpoints.
 * Uses apiClient which reads the JWT from document.cookie.
 * Safe to import from "use client" components.
 *
 * For SERVER-SIDE fetching (RSC / Server Actions), use lib/api/meetups.server.ts.
 */

import { apiClient } from "@/lib/api-client";
import type {
  CreateMeetupRequest,
  MeetupActionResponse,
  MeetupReachRequest,
} from "@/lib/types";

/**
 * POST /api/meetups/create
 * Creates a new meetup.
 */
export async function createMeetup(body: CreateMeetupRequest) {
  return apiClient<{ message: string }>("/api/meetups/create", {
    method: "POST",
    body,
    authenticated: true,
  });
}

/**
 * POST /api/meetups/{id}/join
 * Joins a meetup as a participant.
 */
export async function joinMeetup(id: number | string) {
  return apiClient<MeetupActionResponse>(`/api/meetups/${id}/join`, {
    method: "POST",
    authenticated: true,
  });
}

/**
 * POST /api/meetups/{id}/leave
 * Leaves a meetup the current user has joined.
 */
export async function leaveMeetup(id: number | string) {
  return apiClient<MeetupActionResponse>(`/api/meetups/${id}/leave`, {
    method: "POST",
    authenticated: true,
  });
}

/**
 * POST /api/meetups/{id}/cancel
 * Cancels a meetup — only the host can do this.
 */
export async function cancelMeetup(id: number | string) {
  return apiClient<MeetupActionResponse>(`/api/meetups/${id}/cancel`, {
    method: "POST",
    authenticated: true,
  });
}

/**
 * POST /api/meetups/{id}/reach
 * Marks the current user as reached for the meetup day.
 */
export async function reachMeetup(
  id: number | string,
  body?: MeetupReachRequest,
) {
  return apiClient<MeetupActionResponse>(`/api/meetups/${id}/reach`, {
    method: "POST",
    body: body ?? {},
    authenticated: true,
  });
}
