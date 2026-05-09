import z from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!.%*?&_])[A-Za-z\d$@$!.%*?&_]{8,30}$/;

export const LoginSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be more than 8 characters")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      ),
  })
  .strict();

export type LoginValues = z.infer<typeof LoginSchema>;
