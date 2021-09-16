import { Course } from "@entity/course.entity";
import Faker from "faker";
import { define } from "typeorm-seeding";
import { slug } from "@helpers";

define(Course, (faker: typeof Faker): Course => {
  const name = faker.random.words(2);
  const course = new Course();
  course.title = name;
  course.slug = slug(name);
  course.description = faker.random.words(12);

  return course;
});
