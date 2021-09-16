const seeds = {
  type: "postgres",
  port: 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ["src/entity/**/*.ts"],
  seeds: ['database/seeds/**/*.ts'],
  factories: ['database/factories/**/*.ts'],
};

export default seeds;
