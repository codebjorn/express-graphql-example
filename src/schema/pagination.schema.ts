import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class PaginationArgs {
  @Field({ nullable: true })
  skip: number;

  @Field({ nullable: true })
  take: number;
}
