import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().max(255, "must be at most 255 characters"),
  bio: z
    .string()
    .max(500, "must be at most 500 characters")
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
