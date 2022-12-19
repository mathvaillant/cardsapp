export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      BASE_URL: string;
      MONGO_DB: string;
      TEST_MONGO_DB: string;
      NODE_ENV: "test" | "development" | "staging" | "production";
      ACCESS_TOKEN_SECRET_KEY: string;
      ACCESS_TOKEN_EXPIRATION: string;
      REFRESH_TOKEN_SECRET_KEY: string;
      REFRESH_TOKEN_EXPIRATION: string;
      DEFAULT_TEST_PASSWORD: string;
      USERS_BASE_SIZE: number;
      PROJECTS_BASE_SIZE: number;
      REGISTRIES_BASE_SIZE: number;
      PARISHES_BASE_SIZE: number;
      SALT_ROUNDS: number;
    }
  }
}
