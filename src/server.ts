import fastify from 'fastify';
import { env } from './env';

import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { calculateBmi } from './routes/calculate-bmi';
import { sumNumbers } from './routes/sum-numbers';

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(calculateBmi);
server.register(sumNumbers);

server.get('/', (request, reply) => {
  reply.send('🔥 Hello World! :)');
});

server.listen({ host: env.HOST, port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🔥 Server is running on ${address}`);
});
