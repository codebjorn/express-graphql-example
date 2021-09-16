import IRepository from "@interface/repository.interface";
import RepositoryAbstract from "@abstract/repository.abstract";
import { User } from "@entity/user.entity";
import { getRepository } from "typeorm";
import { injectable } from "inversify";

@injectable()
export class UserRepository
  extends RepositoryAbstract<User>
  implements IRepository<User>
{
  constructor() {
    super();
    this.repository = getRepository(User);
  }
}
