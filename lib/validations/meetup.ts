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

export const CreateMeetupStepOneSchema = z.object({
    title: z.string().min(1, "Title is required"),
    scheduled_time: z.string().min(1, "Scheduled time is required"),
    schedule_date: z.string().min(1, "Schedule date is required"),
});

export const CreateMeetupStepTwoSchema = z.object({
    location_name: z.string().min(1, "Location name is required"),
    participant_limit: z.number().int().min(1, "Participant limit must be at least 1"),
});

export const CreateMeetupStepThreeSchema = z.object({
    vibe: z.string().min(1, "Vibe is required"),
});

export const CreateMeetupSchema = CreateMeetupStepOneSchema
                                    .extend(CreateMeetupStepTwoSchema.shape)
                                    .extend(CreateMeetupStepThreeSchema.shape);

export type UpcomingMeetupType = z.infer<typeof UpcomingMeetupSchema>;

export type CreateMeetupStepOneInput = z.infer<typeof CreateMeetupStepOneSchema>;
export type CreateMeetupStepTwoInput = z.infer<typeof CreateMeetupStepTwoSchema>;
export type CreateMeetupStepThreeInput = z.infer<typeof CreateMeetupStepThreeSchema>;