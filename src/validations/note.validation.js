import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(5, "Content must be at least 5 characters"),
  tags: z
    .array(z.string().min(3, "Each tag must be at least 3 characters"))
    .optional(),
  color: z.string().optional(),
  visibility: z.enum(["PRIVATE", "PROJECT"]).optional(),
  relatedTask: z.string().optional(),
  relatedProject: z.string().optional(),
});

export const todoSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  todos: z
    .array(
      z.object({
        text: z.string().min(5, "Each todo must be at least 5 characters"),
        done: z.boolean().optional(),
      })
    )
    .min(1, "Add at least 1 todo"),
  tags: z
    .array(z.string().min(3, "Each tag must be at least 3 characters"))
    .optional(),
  color: z.string().optional(),
  visibility: z.enum(["PRIVATE", "PROJECT"]).optional(),
  relatedTask: z.string().optional(),
  relatedProject: z.string().optional(),
});
