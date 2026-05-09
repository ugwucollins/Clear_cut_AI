import { z } from "zod";
const regexPassword =
  /^(?=.*[a-z])(?=.*\d)(?=.*[$@$.!%*?&_])[A-Za-z\d$@$!.%*?&_]{8,100}$/;

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(regexPassword, {
        message:
          "Password must have at least 8 characters, one letter,one special",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(regexPassword, {
        message:
          "Password must have at least 8 characters, one letter,one special",
      }),
  })
  .strict();

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(regexPassword, {
        message:
          "Password must have at least 8 characters, one letter,one special",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(regexPassword, {
        message:
          "Password must have at least 8 characters, one letter,one special",
      }),
  })
  .strict();
