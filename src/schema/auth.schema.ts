import { ArgsType, Field, ObjectType } from "type-graphql";

import { IsJWT } from "class-validator";

@ObjectType()
export class LoginType {
  @Field({ nullable: false })
  @IsJWT()
  token: string;
}

@ArgsType()
export class LoginArgs {
  @Field((type) => String)
  username: string;

  @Field((type) => String)
  password: string;
}
