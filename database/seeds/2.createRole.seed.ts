import { Factory, Seeder } from "typeorm-seeding";

import { Connection } from "typeorm";
import { Permission } from "@entity/permission.entity";
import { Role } from "@entity/role.entity";

type MakeRole = { name: string; fullName: string; permissions: Permission[] };

const roles = (permissions: Permission[]): MakeRole[] => {
  const studentPermissions = permissions.filter(
    (permission: Permission) =>
      permission.name === "view.courses" || permission.name === "view.lessons"
  );
  return [
    {
      name: "ADMIN",
      fullName: "Administrator",
      permissions,
    },
    {
      name: "TEACHER",
      fullName: "Teacher",
      permissions,
    },
    {
      name: "STUDENT",
      fullName: "Student",
      permissions: studentPermissions,
    },
  ];
};

export default class CreateRole implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const permissions = await connection.getRepository(Permission).find();
    const newRoles = roles(permissions).map((props: MakeRole) => {
      const role = new Role();
      role.name = props.name;
      role.fullName = props.fullName;
      role.permissions = props.permissions;

      return role;
    });

    await connection.getRepository(Role).save(newRoles);
  }
}
