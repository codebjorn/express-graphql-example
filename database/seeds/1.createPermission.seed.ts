import { Factory, Seeder } from "typeorm-seeding";

import { Connection } from "typeorm";
import { Permission } from "@entity/permission.entity";

const permissions = [
  // Users
  {
    name: "create.users",
  },
  {
    name: "view.users",
  },
  {
    name: "delete.users",
  },
  // Students
  {
    name: "create.students",
  },
  {
    name: "view.students",
  },
  {
    name: "delete.students",
  },
  // Courses
  {
    name: "create.courses",
  },
  {
    name: "view.courses",
  },
  {
    name: "delete.courses",
  },
  // Lessons
  {
    name: "create.lessons",
  },
  {
    name: "view.lessons",
  },
  {
    name: "delete.lessons",
  },
];

export default class CreatePermission implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values(permissions)
      .execute();
  }
}
