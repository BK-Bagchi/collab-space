import { z } from "zod";

export const noteSchema = z
  .object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    type: z.enum(["TEXT", "TODO"], {
      required_error: "Type must be either TEXT or TODO",
    }),
    content: z.string().min(5, "Content must be at least 5 characters"),
    todos: z
      .array(
        z.object({
          text: z.string().min(5, "Todo must be at least 5 characters"),
          done: z.boolean().optional(),
        })
      )
      .optional(),
    tags: z.array(z.string()).optional(),
    color: z.string().optional(),
    visibility: z.enum(["PRIVATE", "PROJECT"]).optional(),
    relatedTask: z.string().optional(),
    relatedProject: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "TEXT") return !!data.content;
      return true;
    },
    { message: "Content is required for TEXT notes", path: ["content"] }
  )
  .refine(
    (data) => {
      if (data.type === "TODO") return data.todos && data.todos.length > 0;
      return true;
    },
    { message: "At least one todo is required for TODO notes", path: ["todos"] }
  );
