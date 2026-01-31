import { z } from "zod";

import type { signUpSchema } from "../Schema/signUpSchema";

export type SignUpFormValues = z.infer<typeof signUpSchema>;
