import fastify from 'fastify';
import { env } from './env';

const server = fastify();

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
