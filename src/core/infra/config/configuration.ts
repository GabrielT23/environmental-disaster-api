import { Logger } from '@nestjs/common';
import { z as zod } from 'zod';
import { config } from 'dotenv';

config();
export interface Config {
  port: number;
  databaseUrl: string;
  hashSecret: string;
  appUrl: string;
  storageDriver: 'google-cloud' | 'disk';
  jwtSecret: string;
  googleCloud: {
    projectId: string;
    storageBucketName: string;
    storageKey: string;
  };
}

export const configuration = (): Config => {
  const logger = new Logger();

  const envSchema = zod.object({
    DATABASE_URL: zod.string().min(1),
    APP_URL: zod.string().url().min(1),
    PORT: zod.string().min(1).regex(/^\d+$/).default('3000').transform(Number),
    GOOGLE_CLOUD_PROJECT_ID: zod.string().min(1),
    GOOGLE_CLOUD_STORAGE_BUCKET_NAME: zod.string().min(1),
    GOOGLE_CLOUD_STORAGE_KEY: zod.string().min(1),
    STORAGE_DRIVER: zod.enum(['disk', 'google-cloud']).default('disk'),
  });

  const envData = envSchema.safeParse(process.env);

  if (!envData.success) {
    logger.error('Variáveis de ambiente inválidas');
    logger.error(envData.error);
    process.exit(1);
  }

  const { data } = envData;

  return {
    port: data.PORT,
    appUrl: data.APP_URL,
    databaseUrl: data.DATABASE_URL,
    hashSecret: String(process.env.HASH_SECRET),
    jwtSecret: String(process.env.JWT_SECRET),
    googleCloud: {
      projectId: data.GOOGLE_CLOUD_PROJECT_ID,
      storageBucketName: data.GOOGLE_CLOUD_STORAGE_BUCKET_NAME,
      storageKey: data.GOOGLE_CLOUD_STORAGE_KEY,
    },
    storageDriver: data.STORAGE_DRIVER,
  };
};
