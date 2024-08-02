# Node.js Fastify Server with TypeScript

This repository is a study project combining Node.js, Fastify, and TypeScript.

## Setting Up Fastify with TypeScript

Follow these steps to set up the Fastify project with TypeScript.

### 1. Create `package.json`

Initialize your project and create a `package.json` file:

```bash
npm init -y
```

### 2. Install TypeScript and Node.js types

Install TypeScript and the necessary Node.js type definitions:

```bash
npm install typescript @types/node -D
```

### 3. Initialize TypeScript configuration

Create the `tsconfig.json` file with default TypeScript settings:

```bash
npx tsc --init
```

### 4. Configure `tsconfig.json`

Update your `tsconfig.json` to use the `@tsconfig/node20` base configuration:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "_version": "20.1.0",
  "compilerOptions": {
    "lib": ["es2023"],
    "module": "node16",
    "target": "es2022",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node16"
  }
}
```

### 5. Install `tsx` package

The `tsx` package simplifies running TypeScript files directly:

```bash
npm install tsx -D
```

### 6. Add development script to `package.json`

Update the `scripts` section of your `package.json` to include a development script:

```json
{
  "scripts": {
    "dev": "npx tsx watch --env-file .env src/server.ts"
  }
}
```

### 7. Create `.env` file

Create a `.env` file at the root of your project:

```
project
└── .env
```

### 8. Install Fastify Framework

Install Fastify, the web framework for your project:

```bash
npm install fastify
```

## Setting Up the Server

### 1. Create `src/server.ts`

Create the directory structure and the main server file:

```
project
└── src
    └── server.ts
```

### 2. Configure `src/server.ts`

Here's a simple Fastify server setup:

```ts
import fastify from 'fastify';

const server = fastify();

server.get('/', (request, reply) => {
  reply.send('Hello World! 🔥');
});

server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🔥 Server is running on ${address}`);
});
```

### 3. Run the Server

Start the server using the development script:

```bash
npm run dev
```

## Setting Up Environment Variables with Zod Validation

### 1. Install Zod

Install the Zod package for schema validation:

```bash
npm install zod
```

### 2. Configure `.env` on Root of Your Project

Create a `.env` file at the root of your project:

```
project
└── .env
```

Add the following environment variables:

```env
HOST = 127.0.0.1
PORT = 3333
```

### 3. Create `env.ts` File

Create an `env.ts` file for environment variable validation:

```
project
└── src
    └── env.ts
```

### 4. Configure `env.ts` File

Use Zod to validate and parse environment variables:

```ts
import z from 'zod';

const envSchema = z.object({
  HOST: z.string().ip(),
  PORT: z.coerce.number(),
});

export const env = envSchema.parse(process.env);
```

### 5. Use `env.ts` in `server.ts`

Import and use the validated environment variables in your server configuration:

```ts
import fastify from 'fastify';

// import env
import { env } from './env';

const server = fastify();

server.get('/', (request, reply) => {
  reply.send('Hello World! 🔥');
});

// use env.HOST and env.PORT
server.listen({ host: env.HOST, port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🔥 Server is running on ${address}`);
});
```

## Additional Resources

- [Fastify Documentation](https://www.fastify.io/docs/latest/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)
