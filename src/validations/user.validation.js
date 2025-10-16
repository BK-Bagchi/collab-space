import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  bio: z.string().max(200, "Bio can be up to 200 characters").optional(),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Please upload an image")
    .optional(),
});

// export const changePasswordSchema = z
//   .object({
//     oldPassword: z.string().min(8, "Password must be at least 8 characters"),
//     newPassword: z.string().min(8, "Password must be at least 8 characters"),
//     confirmPassword: z
//       .string()
//       .min(8, "Password must be at least 8 characters"),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Password and Confirm Password do not match",
//     path: ["confirmPassword"], // shows error under confirmPassword input
//   });
