import { z } from 'zod';

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .max(100, 'Project name must be less than 100 characters'),

  description: z.string().min(1, 'Description is required'),

  status: z.enum(['Active', 'Completed']),

  assignedUserId: z.number().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
