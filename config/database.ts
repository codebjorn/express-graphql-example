import { ConnectionOptions } from "typeorm";

const dbConfig: ConnectionOptions = {
  type: "postgres",
  port: 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: ["error"],
  entities: ["src/entity/**/*.ts"],
  migrations: ["database/migrations/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "database/migrations",
    subscribersDir: "src/subscriber",
  },
};

export default dbConfig;
