import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';

type FastifyErrorHandler = FastifyInstance['errorHandler'];
export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      issues: error.flatten().fieldErrors,
    });
    return;
  }

  reply.send(error);
};
