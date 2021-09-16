import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql";

import { inject, injectable } from "inversify";
import { services } from "@dictionary";
import {
  CreateUserInput,
  DeleteUserType,
  UpdateUserInput,
  UserType,
} from "@schema/user.schema";
import { PaginationArgs } from "@schema/pagination.schema";
import { IUserService } from "@interface/userService.interface";

@injectable()
@Resolver()
class UserResolver {
  private userService: IUserService;

  constructor(@inject(services.UserService) userService: IUserService) {
    this.userService = userService;
  }

  @Authorized("view.users")
  @Query((returns) => UserType)
  public async getUser(@Arg("id") id: number): Promise<UserType> {
    return await this.userService.get(id);
  }

  @Authorized("view.users")
  @Query((returns) => [UserType])
  public async getAllUsers(
    @Args() options: PaginationArgs
  ): Promise<UserType[]> {
    return await this.userService.getAll({ ...options });
  }

  @Authorized("create.users")
  @Mutation((returns) => UserType)
  public async createUser(
    @Arg("createData") createData: CreateUserInput
  ): Promise<UserType> {
    return await this.userService.createOrUpdate({ ...createData });
  }

  @Authorized("create.users")
  @Mutation((returns) => UserType)
  public async updateUser(
    @Arg("id") id: number,
    @Arg("updateData") updateData: UpdateUserInput
  ): Promise<UserType> {
    return await this.userService.createOrUpdate({ ...updateData }, id);
  }

  @Authorized("delete.users")
  @Mutation((returns) => DeleteUserType)
  public async deleteUser(@Arg("id") id: number): Promise<DeleteUserType> {
    return await this.userService.delete(id);
  }
}

export default UserResolver;
