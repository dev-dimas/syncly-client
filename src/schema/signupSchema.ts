import { fieldConfig, ZodProvider } from "@autoform/zod";
import { z } from "zod";

const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name should be at least 3 characters")
      .max(150, "Name should be at most 150 characters")
      .superRefine(
        fieldConfig({
          inputProps: {
            type: "text",
            placeholder: "Input your name",
          },
        })
      ),
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
    confirmPassword: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .superRefine(
        fieldConfig({
          inputProps: {
            type: "password",
            placeholder: "Confirm your password",
          },
        })
      ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
export default new ZodProvider(signupSchema);
