import { Field, ObjectType } from "type-graphql";

import { PermissionType } from "./permission.schema";

@ObjectType()
export class RoleType {
  @Field()
  id: number;

  @Field()
  name: string;


  @Field()
  fullName: string;

  @Field((type) => [PermissionType], {nullable: true})
  permissions: PermissionType[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}