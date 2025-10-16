import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  bio: z.string().max(200, "Bio can be up to 200 characters").optional(),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Please upload an image")
    .optional(),
});

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "New and Confirm Password do not match"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"], // shows error under confirmPassword input
    message: "Password and Confirm Password do not match",
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    path: ["newPassword"], // shows error under newPassword input
    message: "New password cannot be the same as current password",
  });
