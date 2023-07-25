import * as zod from 'zod';

export const envSchema = zod.object({
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: zod.string().nonempty(),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: zod.string().nonempty(),
})

export type Env = zod.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
