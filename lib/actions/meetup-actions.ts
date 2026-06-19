"use server";

/**
 * lib/actions/meetup-actions.ts
 *
 * Next.js Server Actions for meetup operations that need server-side
 * execution (e.g., reading the auth cookie, triggering revalidation).
 *
 * For simple client-side calls (join/leave/create), prefer calling
 * the functions in lib/api/meetups.ts directly from client components.
 */

import { revalidatePath } from "next/cache";
import { apiServer } from "@/lib/api-server";
import type { MeetupActionResponse, MeetupReachRequest } from "@/lib/types";
import type { ApiResponse } from "@/lib/types";
import { MeetupReachSchema } from "@/lib/validations/meetup";

/**
 * Server Action: Cancel a meetup.
 * Only the host of the meetup can cancel it.
 *
 * @param id - The meetup ID to cancel
 */
export async function cancelMeetupAction(
  id: number | string,
): Promise<ApiResponse<MeetupActionResponse>> {
  const result = await apiServer<MeetupActionResponse>(
    `/api/meetups/${id}/cancel`,
    { method: "POST" },
  );

  if (!result.error) {
    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/${id}`);
  }

  return result;
}

/**
 * Server Action: Mark as reached on meetup day.
 * Only participants of the meetup can call this.
 *
 * @param id   - The meetup ID
 * @param note - Optional arrival note (e.g. "I'll arrive around 4:10")
 */
export async function reachMeetupAction(
  id: number | string,
  note?: string,
): Promise<ApiResponse<MeetupActionResponse>> {
  // Validate the optional note with zod
  const parsed = MeetupReachSchema.safeParse({ note });
  if (!parsed.success) {
    return {
      data: null,
      error: parsed.error.flatten().fieldErrors.note?.[0] ?? "Invalid input",
    };
  }

  const body: MeetupReachRequest | undefined =
    parsed.data.note ? { note: parsed.data.note } : undefined;

  const result = await apiServer<MeetupActionResponse>(
    `/api/meetups/${id}/reach`,
    { method: "POST", body: body ?? {} },
  );

  if (!result.error) {
    revalidatePath(`/dashboard/${id}`);
  }

  return result;
}
