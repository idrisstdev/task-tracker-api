import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, { message: "Le titre est obligatoire." }),
  description: z.string().nullable(),
  completed: z.boolean().default(false),
});

export const taskUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().nullable(),
  completed: z.boolean().optional(),
});

// A garder selon usage
export type TaskInput = z.infer<typeof taskSchema>;
