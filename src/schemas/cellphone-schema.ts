import z from "zod";

export const CellPhoneSchema = z.object({
  cellphone: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine(
      (value) => value.length == 11,
      "Expected cellphone with 11 numbers."
    )
    .or(
      z
        .number()
        .refine(
          (value) => value.toString().length == 11,
          "Expected cellphone with 11 numbers."
        )
    ),
});
