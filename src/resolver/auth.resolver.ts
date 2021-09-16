import { Args, Query, Resolver } from "type-graphql";

import { inject, injectable } from "inversify";
import { LoginArgs, LoginType } from "@schema/auth.schema";
import { services } from "@dictionary";
import UserService from "@service/user.service";

@injectable()
@Resolver()
class AuthResolver {
  private userService: UserService;

  constructor(@inject(services.UserService) userService: UserService) {
    this.userService = userService;
  }

  @Query((returns) => LoginType)
  public async login(
    @Args() { username, password }: LoginArgs
  ): Promise<LoginType> {
    return { token: await this.userService.login(username, password) };
  }
}

export default AuthResolver;
