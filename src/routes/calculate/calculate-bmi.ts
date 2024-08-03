import { BmiSchema } from '../../schemas/bmi-schema';
import { calculateBmi } from '../../services/bmi-service';
import { FastifyInstanceWithValidator } from '../../types';

export async function calculateBmiRoute(server: FastifyInstanceWithValidator) {
  server.post(
    '/calculate/bmi',
    {
      schema: {
        body: BmiSchema,
      },
    },
    (request, reply) => {
      const { weight, height } = request.body;
      const result = calculateBmi(weight, height);

      reply.send(result);
    }
  );
}
