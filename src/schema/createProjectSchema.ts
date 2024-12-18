import { fieldConfig, ZodProvider } from "@autoform/zod";
import { z } from "zod";

const createProjectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name is required")
    .superRefine(
      fieldConfig({
        inputProps: {
          type: "text",
          placeholder: "Input project name",
        },
      })
    ),
});

export type CreateProjectSchemaType = z.infer<typeof createProjectSchema>;
export default new ZodProvider(createProjectSchema);
