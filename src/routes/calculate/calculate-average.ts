import z from 'zod';
import { FastifyInstanceWithValidator } from '../../types';

export async function calculateAverage(server: FastifyInstanceWithValidator) {
  server.post(
    '/calculate/average',
    {
      schema: { body: z.object({ numbers: z.array(z.number()) }) },
    },
    (request, reply) => {
      const { numbers } = request.body;
      const totalSum = numbers.reduce((prev, acc) => prev + acc, 0);
      const average = Number((totalSum / numbers.length).toFixed(2));
      reply.send({ average });
    }
  );
}
