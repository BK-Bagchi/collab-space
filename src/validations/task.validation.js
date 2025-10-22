import { z } from "zod";

export const assignTaskSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Task title must be at least 5 characters long" }),
  subtasks: z
    .array(
      z.object({
        title: z
          .string()
          .min(5, { message: "Subtask must be at least 5 characters long" }),
      })
    )
    .optional(),
});
