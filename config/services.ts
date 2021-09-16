import AuthResolver from "@resolver/auth.resolver";
import { ContainerModule } from "inversify";
import { RoleRepository } from "@repository/role.repository";
import { UserRepository } from "@repository/user.repository";
import UserResolver from "@resolver/user.resolver";
import UserService from "@service/user.service";
import { services as serviceDictionary } from "@dictionary";

const services = new ContainerModule((bind) => {
  // Repositories
  bind<UserRepository>(serviceDictionary.UserRepository).to(UserRepository);
  bind<RoleRepository>(serviceDictionary.RoleRepository).to(RoleRepository);

  // Services
  bind<UserService>(serviceDictionary.UserService).to(UserService);

  // Resolvers ** Don't forget to make inSingletonScope **
  bind<AuthResolver>(AuthResolver).to(AuthResolver).inSingletonScope();
  bind<UserResolver>(UserResolver).to(UserResolver).inSingletonScope();
});

export default services;
