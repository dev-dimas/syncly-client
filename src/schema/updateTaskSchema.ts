import { fieldConfig, ZodProvider } from "@autoform/zod";
import { z } from "zod";

export enum StatusType {
  ACTIVE = "Active",
  PAUSED = "Paused",
  COMPLETED = "Completed",
}

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(2, "Title should be at least 2 characters")
    .superRefine(
      fieldConfig({
        inputProps: {
          type: "text",
          placeholder: "Input task title",
        },
      })
    ),
  description: z
    .string()
    .optional()
    .superRefine(
      fieldConfig({
        inputProps: {
          type: "text",
          placeholder: "[Optional] Input task description",
        },
      })
    ),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
export default new ZodProvider(updateTaskSchema);
