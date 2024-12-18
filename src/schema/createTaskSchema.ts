import { fieldConfig, ZodProvider } from "@autoform/zod";
import { z } from "zod";

const createTaskSchema = z.object({
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

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export default new ZodProvider(createTaskSchema);
