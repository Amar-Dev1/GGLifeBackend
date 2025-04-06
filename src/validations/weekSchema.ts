import { number, string, z } from "zod";

export const weekSchema = z.object({
  title: string().max(10, "must be at most 5 characters"),
  score: number().max(100.00, "must be at most 5"),
});
