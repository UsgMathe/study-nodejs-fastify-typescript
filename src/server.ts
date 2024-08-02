import fastify from 'fastify';
import { z } from 'zod';
import { env } from './env';

import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { calculateBmi } from './routes/calculate-bmi';

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(calculateBmi);

server.get('/', (request, reply) => {
  reply.send('🔥 Hello World! :)');
});

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

server.listen({ host: env.HOST, port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🔥 Server is running on ${address}`);
});
