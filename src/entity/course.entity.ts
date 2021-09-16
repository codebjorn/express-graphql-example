import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Lesson } from "./lesson.entity";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  title: string;

  @Column({ type: "text", unique: true })
  slug: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @OneToMany(() => Lesson, (lesson) => lesson.course, { onDelete: "SET NULL" })
  lessons: Lesson[];

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
