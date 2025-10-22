import { z } from "zod";

export const assignTaskSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Task title must be at least 5 characters long" }),
  status: z
    .string()
    .refine(
      (val) => ["TODO", "IN_PROGRESS", "DONE"].includes(val.toUpperCase()),
      { message: "Status must be one of TODO, IN_PROGRESS, or DONE" }
    ),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please provide a valid date (YYYY-MM-DD)",
  }),
  priority: z
    .string()
    .refine((val) => ["LOW", "MEDIUM", "HIGH"].includes(val.toUpperCase()), {
      message: "Priority must be LOW, MEDIUM, or HIGH",
    }),
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
