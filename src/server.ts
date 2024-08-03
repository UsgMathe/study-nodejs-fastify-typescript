import fastify from 'fastify';
import { env } from './env';

import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { errorHandler } from './errorHandler';
import { calculateAverage } from './routes/calculate/calculate-average';
import { calculateBmi } from './routes/calculate/calculate-bmi';
import { sumNumbers } from './routes/sum-numbers';

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setErrorHandler(errorHandler);

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(sumNumbers);
server.register(calculateBmi);
server.register(calculateAverage);

server.get('/', (_, reply) => {
  reply.send('🔥 Hello World! :)');
});

server.listen({ host: env.HOST, port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🔥 Server is running on ${address}`);
});
