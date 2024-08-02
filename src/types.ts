import { FastifyBaseLogger, FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { IncomingMessage, Server, ServerResponse } from 'http';

export type FastifyInstanceWithValidator = FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse,
  FastifyBaseLogger,
  ZodTypeProvider
>;
