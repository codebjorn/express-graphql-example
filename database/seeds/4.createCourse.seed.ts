import { Factory, Seeder } from "typeorm-seeding";

import { Course } from "@entity/course.entity";

export default class CreateCourse implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Course)().createMany(5);
  }
}
