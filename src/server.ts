import fastify from 'fastify';
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { env } from './env';
import { errorHandler } from './error-handler';

import { calculateAverage } from './routes/calculate/calculate-average';
import { calculateBmiRoute } from './routes/calculate/calculate-bmi';
import { formatBrazilianCellphone } from './routes/format/format-brazilian-cellphone ';
import { sumNumbers } from './routes/sum-numbers';

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setErrorHandler(errorHandler);

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(sumNumbers);
server.register(calculateBmiRoute);
server.register(calculateAverage);
server.register(formatBrazilianCellphone);

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
