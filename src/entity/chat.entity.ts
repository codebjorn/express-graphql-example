import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "teacher_id" })
  teacher: User;

  @OneToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "student_id" })
  student: User;

  @Column({ type: "json" })
  discussion: Record<string, unknown>;

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
