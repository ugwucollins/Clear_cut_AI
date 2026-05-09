import z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(5, {
      message: "Name must be at least 5 characters",
    }),
    role: z
      .string()
      .min(2, {
        message: "Role must be at least 5 characters",
      })
      .optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    phone: z
      .string()
      .min(10, { message: "Phone Number must be at least 10 characters" }),
  })
  .strict();

export type RegisterValues = z.infer<typeof RegisterSchema>;
