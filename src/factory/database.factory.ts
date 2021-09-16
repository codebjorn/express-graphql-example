import { createConnection } from "typeorm";
import dbConfig from "@config/database";

class DatabaseFactory {
  public static async create(): Promise<void> {
    await createConnection(dbConfig);
  }
}

export default DatabaseFactory;
