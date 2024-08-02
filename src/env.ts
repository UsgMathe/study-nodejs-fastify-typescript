import z from 'zod';

const envSchema = z.object({
  HOST: z.string().ip(),
  PORT: z.coerce.number(),
});

export const env = envSchema.parse(process.env);
