import z from 'zod';
import { FastifyInstanceWithValidator } from '../types';

export async function sumNumbers(server: FastifyInstanceWithValidator) {
  server.post(
    '/sum-numbers',
    {
      schema: { body: z.object({ numbers: z.array(z.number()) }) },
    },
    (request, reply) => {
      const { numbers } = request.body;
      reply.send(numbers.reduce((prev, acc) => prev + acc, 0));
    }
  );
}
