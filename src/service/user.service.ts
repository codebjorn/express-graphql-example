import { services } from "@dictionary";
import { User } from "@entity/user.entity";
import { compare } from "bcrypt";
import { isEmail } from "class-validator";
import { inject, injectable } from "inversify";
import { FindOneOptions } from "typeorm";
import jwt from "jsonwebtoken";
import graphQLConfig from "@config/graphql";
import { Permission } from "@entity/permission.entity";
import {
  IUserService,
  UserCreateOrUpdateParameters,
  UserFillParameters,
  UserPayload,
} from "@interface/userService.interface";
import ServiceAbstract from "@abstract/service.abstract";
import IRepository from "@interface/repository.interface";
import { Role } from "@entity/role.entity";

@injectable()
class UserService extends ServiceAbstract<User> implements IUserService {
  protected repository: IRepository<User>;
  protected roleRepository: IRepository<Role>;
  protected relations: Array<string> = ["role", "role.permissions"];

  constructor(
    @inject(services.UserRepository) repository: IRepository<User>,
    @inject(services.RoleRepository) roleRepository: IRepository<Role>
  ) {
    super();
    this.repository = repository;
    this.roleRepository = roleRepository;
  }

  public async login(username: string, password: string): Promise<string> {
    const options: FindOneOptions = {
      where: isEmail(username) ? { email: username } : { username },
      relations: this.relations,
    };
    const user = await this.repository.findOneOrFail(null, options);
    let token: string;

    if (await compare(password, user.password)) {
      token = this.jwtSign(user);
    }

    return token;
  }

  public async createOrUpdate(
    fields: UserCreateOrUpdateParameters,
    userId?: number
  ): Promise<User> {
    const role = await this.roleRepository.findOneOrFail(fields.roleId, {
      relations: ["permissions"],
    });
    let user: User = await this.getUser(userId);

    user = this.fill({
      user,
      email: fields.email,
      username: fields.username,
      name: fields.name,
      password: fields.password,
      role,
    });
    user = await this.repository.save(user);

    return user;
  }

  public jwtSign(user: User): string {
    return jwt.sign(this.payload(user), graphQLConfig.authSecret, {
      expiresIn: "4h",
      algorithm: "HS256",
    });
  }

  private async getUser(userId: number): Promise<User> {
    if (!userId) return this.repository.create();

    return await this.repository.findOneOrFail(userId);
  }

  private fill(fields: UserFillParameters): User {
    const user = fields.user
      .setEmail(fields.email)
      .setUsername(fields.username)
      .setName(fields.name)
      .setPassword(fields.password)
      .setRole(fields.role);
    return user;
  }

  private payload(user: User): UserPayload {
    return {
      id: user.id,
      name: user.name,
      role: {
        name: user.role.name,
        permissions: user.role.permissions.map(
          (permision: Permission) => permision.name
        ),
      },
    };
  }
}

export default UserService;
