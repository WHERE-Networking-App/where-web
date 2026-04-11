import z from "zod";

export const UpcomingMeetupSchema = z.object({
    id: z.string(),
    title: z.string(),
    scheduled_time: z.string(),
    location_name: z.string(),
    reveal_status: z.boolean().default(false),
    participants: z.number().int().nonnegative(),
    participant_aliases: z.array(
        z.object({
            name: z.string(),
            status: z.string(),
        })
    ),
})

export type UpcomingMeetupType = z.infer<typeof UpcomingMeetupSchema>;