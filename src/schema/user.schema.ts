import { Authorized, Field, InputType, ObjectType } from "type-graphql";

import { IsEmail } from "class-validator";
import { RoleType } from "./role.schema";

@ObjectType()
export class UserType {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  name: string;

  @Authorized("create.users")
  @Field()
  password: string;

  @Field((type) => RoleType)
  role: RoleType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class DeleteUserType {
  @Field((type) => [String], {nullable: true})
  raw: any;

  @Field({nullable: true})
  affected?: number | null;
}

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: false })
  roleId: number;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  roleId: number;
}
