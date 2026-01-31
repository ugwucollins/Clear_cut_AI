import { z } from "zod";

export const NewsSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
export const ContactSchema = z
  .object({
    name: z.string().min(5, {
      message: "Name must be at least 5 characters",
    }),
    email: z.string().email({ message: "Invalid email address" }),

    subject: z
      .string()
      .min(10, { message: "subject/title must be at least 10 characters" }),

    message: z
      .string()
      .min(30, { message: "message must be at least 30 characters" }),
  })
  .strict();
