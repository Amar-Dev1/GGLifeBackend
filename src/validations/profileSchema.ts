import { z } from "zod";

export const profileSchema = z.object({
  bio: z
    .string()
    .max(5, "must be at most 500 characters")
    .optional()
    .nullable(),
  photo: z
    .instanceof(Buffer)
    .optional()
    .nullable()
    .refine((file) => !file || file.length <= 5_000_000, {
      message: "Image must be under 5MB",
    }),
});
