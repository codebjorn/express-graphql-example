import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Role } from "./role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text", unique: true })
  username: string;

  @Column({ type: "text", unique: true })
  name: string;

  @Column({ type: "text", unique: true })
  password: string;

  @OneToOne(() => Role, {
    nullable: true,
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "role_id" })
  role: Role;

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

  public setEmail(value: string | null): this {
    this.email = value ?? this.email;
    return this;
  }

  public setName(value: string | null): this {
    this.name = value ?? this.name;
    return this;
  }

  public setUsername(value: string | null): this {
    this.username = value ?? this.username;
    return this;
  }

  public setPassword(value: string | null): this {
    this.password = value ?? this.password;
    return this;
  }

  public setRole(role: Role | null): this {
    this.role = role ?? this.role;
    return this;
  }
}
