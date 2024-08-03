import { z } from 'zod';

export const BmiSchema = z.object({
  weight: z.number().min(4).max(600),
  height: z.number().min(50).max(300),
});
