import { z } from "zod";
import type { ContactSchema, NewsSchema } from "../Schema/ContactSchema";

export type ContactValues = z.infer<typeof ContactSchema>;
export type NewsLetterValues = z.infer<typeof NewsSchema>;
