import type z from "zod";
import type { ProfileSchema } from "../Schema/ProfileSchema";

export type ProfileValues = z.infer<typeof ProfileSchema>;
