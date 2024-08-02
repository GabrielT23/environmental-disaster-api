import { z as zod } from 'zod';

export interface Config {
  port: number;
  databaseUrl: string;
  hashSecret: string;
  jwtSecret: string;
}

export const configuration = (): Config => {
  const envSchema = zod.object({
    DATABASE_URL: zod.string().min(1),
    PORT: zod.string().min(1).regex(/^\d+$/).default('3000').transform(Number),
  });

  const isValidEnv = envSchema.safeParse(process.env).success;
  if (!isValidEnv) {
    console.error('Variáveis de ambiente inválidas');
    process.exit(1);
  }

  return {
    port: Number(process.env.PORT),
    databaseUrl: String(process.env.DATABASE_URL),
    hashSecret: String(process.env.HASH_SECRET),
    jwtSecret: String(process.env.JWT_SECRET),
  };
};
