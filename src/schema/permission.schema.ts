import { Field, ObjectType } from "type-graphql";

import { RoleType } from "./role.schema";

@ObjectType()
export class PermissionType {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field((type) => [RoleType])
  roles: RoleType[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
