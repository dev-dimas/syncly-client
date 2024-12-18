import { fieldConfig, ZodProvider } from "@autoform/zod";
import { z } from "zod";

const editProfileSchema = z.object({
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
});

export type EditProfileSchemaType = z.infer<typeof editProfileSchema>;
export default new ZodProvider(editProfileSchema);
