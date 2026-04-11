import z from "zod";

export const LoginSchema = z.object({
    email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
});

export const SignUpSchema = z.object({
    email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z
    .string()
    .min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const AccountSteupStepOneSchema = z.object({
    userId: z.string().uuid("Invalid user ID"),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores"),
    inAppName: z
        .string()
        .min(3, "In-app name must be at least 3 characters")
        .max(20, "In-app name must be at most 20 characters")
        .regex(/^[a-zA-Z0-9\s\-_]+$/, "In-app name can only contain letters, numbers, spaces, hyphens, and underscores"),
    profession: z
        .string()
        .min(2, "Profession must be at least 2 characters")
        .max(100, "Profession is too long"),
});

export const AccountSetupStepTwoSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  interests: z
    .array(z.string().min(1))
    .min(1, "Select at least one interest"),
//   hobbies: z
//     .array(z.string().min(1))
//     .min(1, "Select at least one hobby"),
});

export const AccountSetupSchema = AccountSteupStepOneSchema
                                    .omit({ userId: true })
                                    .merge(AccountSetupStepTwoSchema);

export type AccountSetupStepOneInput = z.infer<typeof AccountSteupStepOneSchema>
export type AccountSetupStepTwoInput = z.infer<typeof AccountSetupStepTwoSchema>
export type AccountSetupInput = z.infer<typeof AccountSetupSchema> & { userId: string }