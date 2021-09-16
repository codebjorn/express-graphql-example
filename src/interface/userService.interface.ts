import IService from "./service.interface";
import { Role } from "@entity/role.entity";
import { User } from "@entity/user.entity";

export interface IUserService extends IService<User> {
  login(username: string, password: string): Promise<string>;
  jwtSign(user: User): string;
}

interface UserBaseParameters {
  email: string | null;
  username: string | null;
  name: string | null;
  password: string | null;
}

interface RoleParameter {
  roleId: number;
}

export interface UserCreateOrUpdateParameters extends RoleParameter {
  email: string;
  username: string;
  name: string;
  password: string;
}

export interface UserFillParameters extends UserBaseParameters {
  user: User;
  role: Role | null;
}

export interface UserPayload {
  id: number;
  name: string;
  role: {
    name: string;
    permissions: string[];
  };
}
