import z from "zod";

export const PriceSchema = z
  .object({
    title: z.string().min(3, {
      message: "Please enter the title",
    }),
    plan: z.string().min(3, {
      message: "Please enter the plan",
    }),
    amount: z.string().min(1, {
      message: "Please enter the amount",
    }),
    message: z.string().min(1, {
      message: "Please enter the title message",
    }),
    btnText: z.string().min(1, {
      message: "Please enter the Button Name",
    }),
    value: z
      .string()
      .min(1, {
        message: "Please enter the amount",
      })
      .optional(),
    list: z.string(),
    // .array()
    //   message: "Please enter the amount",
  })
  .strict();

export type PriceValues = z.infer<typeof PriceSchema>;
