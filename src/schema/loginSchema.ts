import { fieldConfig, ZodProvider } from "@autoform/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("Email is invalid")
    .min(1, "Email is required")
    .superRefine(
      fieldConfig({
        inputProps: {
          type: "email",
          placeholder: "Input your email",
        },
      })
    ),
  password: z
    .string()
    .min(8, "Password should be at least 8 characters")
    .superRefine(
      fieldConfig({
        inputProps: {
          type: "password",
          placeholder: "Input your password",
        },
      })
    ),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export default new ZodProvider(loginSchema);
