import { Factory, Seeder } from "typeorm-seeding";

import { Connection } from "typeorm";
import { Role } from "@entity/role.entity";
import { User } from "@entity/user.entity";

export default class CreateUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const roles = await connection.getRepository(Role).find();
    await factory(User)(roles).createMany(5);
  }
}
