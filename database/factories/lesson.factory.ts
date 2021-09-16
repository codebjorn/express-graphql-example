import { randomFromArray, slug } from "@helpers";

import { Course } from "@entity/course.entity";
import Faker from "faker";
import { Lesson } from "@entity/lesson.entity";
import { define } from "typeorm-seeding";

const exercies = (faker: typeof Faker) => [
  {
    name: faker.random.words(3),
    description: faker.random.words(6),
    type: "single-choice",
  },
  {
    name: faker.random.words(3),
    description: faker.random.words(6),
    type: "multi-choice",
  },
  {
    name: faker.random.words(3),
    description: faker.random.words(6),
    type: "write",
  },
];

define(Lesson, (faker: typeof Faker, courses: Course[]): Lesson => {
  const name = faker.random.words(2);
  const lesson = new Lesson();
  lesson.title = name;
  lesson.slug = slug(name);
  lesson.description = faker.random.words(8);
  lesson.exercises = exercies(faker);
  lesson.course = randomFromArray<Course>(courses);

  return lesson;
});
