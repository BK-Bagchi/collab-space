import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(5, "Content must be at least 5 characters"),
  tags: z
    .array(
      z
        .string()
        .min(2, "Tag must be at least 2 characters")
        .max(10, "Tag cannot exceed 10 characters")
    )
    .optional(),
  color: z.string().optional(),
  visibility: z.enum(["PRIVATE", "PROJECT"]).optional(),
  relatedTask: z.string().optional(),
  relatedProject: z.string().optional(),
});

export const todoSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  todos: z
    .array(
      z.object({
        text: z.string().min(5, "Todo must be at least 5 characters"),
      })
    )
    .min(1, "At least one todo is required"),
  tags: z
    .array(
      z
        .string()
        .min(2, "Tag must be at least 2 characters")
        .max(10, "Tag cannot exceed 10 characters")
    )
    .optional(),
  color: z.string(),
  visibility: z.enum(["PRIVATE"]),
  relatedTask: z.string().optional(),
  relatedProject: z.string().optional(),
});
