import { z } from "zod";
import type { signInSchema } from "../Schema/signInSchema";

export type SignInFormValues = z.infer<typeof signInSchema>;
