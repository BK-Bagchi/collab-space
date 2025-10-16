import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description too long"),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Use hex color format"),
  deadline: z.string().min(1, "Deadline is required"),
  members: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        val
          .split(",")
          .map((email) => email.trim())
          .every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
      "Invalid email(s) format"
    ),
});
