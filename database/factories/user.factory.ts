import { genSaltSync, hashSync } from "bcrypt";

import Faker from "faker";
import { Role } from "@entity/role.entity";
import { User } from "@entity/user.entity";
import { define } from "typeorm-seeding";
import { randomFromArray } from "@helpers";

define(User, (faker: typeof Faker, roles: Role[]): User => {
  const email = faker.internet.email();
  const salt = genSaltSync();

  const user = new User();
  user.email = email;
  user.username = faker.internet.userName();
  user.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  user.password = hashSync(email, salt);
  user.role = randomFromArray<Role>(roles);
  return user;
});
