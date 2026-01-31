import { z } from "zod";

export const ProfileSchema = z
  .object({
    name: z.string().min(5, {
      message: "Name must be at least 5 characters",
    }),
    phoneNumber: z.string().min(11, {
      message: "Name must be at least 11 characters",
    }),
    email: z.string().email({ message: "Invalid email address" }),
  })
  .strict();
