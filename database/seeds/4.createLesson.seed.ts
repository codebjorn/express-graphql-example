import { Factory, Seeder } from "typeorm-seeding";

import { Connection } from "typeorm";
import { Course } from "@entity/course.entity";
import { Lesson } from "@entity/lesson.entity";

export default class CreateLesson implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const courses = await connection.getRepository(Course).find({ take: 5 });
    await factory(Lesson)(courses).createMany(5);
  }
}
