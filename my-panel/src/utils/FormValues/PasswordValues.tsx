import { z } from "zod";
import type {
  passwordSchema,
  ResetPasswordSchema,
} from "../Schema/PasswordSchema";

export type PasswordValues = z.infer<typeof passwordSchema>;
export type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;
