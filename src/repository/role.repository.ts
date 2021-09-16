import IRepository from "@interface/repository.interface";
import RepositoryAbstract from "@abstract/repository.abstract";
import { Role } from "@entity/role.entity";
import { getRepository } from "typeorm";
import { injectable } from "inversify";

@injectable()
export class RoleRepository
  extends RepositoryAbstract<Role>
  implements IRepository<Role>
{
  constructor() {
    super();
    this.repository = getRepository(Role);
  }
}
