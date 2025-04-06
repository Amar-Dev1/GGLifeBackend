import { number, string, z } from "zod";

export const taskSchema = z.object({
  title: string().max(255, "must be at most 255 characters"),
  score: number().max(5, "must be at most 5"),
});
