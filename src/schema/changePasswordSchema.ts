import { fieldConfig, ZodProvider } from "@autoform/zod";
import { z } from "zod";

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Your current password should be at least 8 characters")
      .superRefine(
        fieldConfig({
          inputProps: {
            type: "password",
            placeholder: "Input your current password",
          },
        })
      ),
    newPassword: z
      .string()
      .min(8, "Your new password should be at least 8 characters")
      .superRefine(
        fieldConfig({
          inputProps: {
            type: "password",
            placeholder: "Input your new password",
          },
        })
      ),
    confirmNewPassword: z
      .string()
      .min(8, "Your new password should be at least 8 characters")
      .superRefine(
        fieldConfig({
          inputProps: {
            type: "password",
            placeholder: "Confirm your new password",
          },
        })
      ),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmNewPassword"],
      });
    }
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
export default new ZodProvider(changePasswordSchema);
