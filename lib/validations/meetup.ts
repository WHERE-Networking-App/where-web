import { z } from "zod";

// ─── Enum constants ──────────────────────────────────────────────────
export const TIME_SLOTS = ["Morning", "Noon", "Evening", "Night"] as const;
export const VIBES = ["Coffee", "Beer", "Coworking"] as const;

export const timeSlotOptions = TIME_SLOTS.map((s) => ({
  label: s,
  value: s,
}));

export const vibeOptions = VIBES.map((v) => ({
  label: v,
  value: v,
}));

// ─── Create-meetup step schemas ──────────────────────────────────────

/** Step 1 — title, date, timeSlot, city, location */
export const CreateMeetupStepOneSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  timeSlot: z.enum(TIME_SLOTS, {
    error: "Please select a time slot",
  }),
  city: z.string().min(1, "City is required"),
  location: z.string().optional(),
});

/** Step 2 — participants limit */
export const CreateMeetupStepTwoSchema = z.object({
  participantsLimit: z
    .number()
    .int()
    .min(2, "Minimum 2 participants")
    .max(50, "Maximum 50 participants"),
});

/** Step 3 — vibe (strictly validated against the API enum) */
export const CreateMeetupStepThreeSchema = z.object({
  vibe: z.enum(VIBES, { error: "Please select a valid vibe" }),
});

/** Combined schema for the full create meetup request */
export const CreateMeetupSchema = CreateMeetupStepOneSchema.extend(
  CreateMeetupStepTwoSchema.shape,
).extend(CreateMeetupStepThreeSchema.shape);

// ─── Reach schema ────────────────────────────────────────────────────

/** Body for POST /api/meetups/{id}/reach */
export const MeetupReachSchema = z.object({
  note: z.string().max(500, "Note must be 500 characters or less").optional(),
});

// ─── Inferred types ──────────────────────────────────────────────────
export type CreateMeetupStepOneInput = z.infer<typeof CreateMeetupStepOneSchema>;
export type CreateMeetupStepTwoInput = z.infer<typeof CreateMeetupStepTwoSchema>;
export type CreateMeetupStepThreeInput = z.infer<typeof CreateMeetupStepThreeSchema>;
export type CreateMeetupInput = z.infer<typeof CreateMeetupSchema>;
export type MeetupReachInput = z.infer<typeof MeetupReachSchema>;