import { DeleteResult, FindManyOptions } from "typeorm";

import IRepository from "@interface/repository.interface";
import { injectable } from "inversify";

@injectable()
abstract class ServiceAbstract<Entity> {
  protected repository: IRepository<Entity>;
  protected relations: Array<string> = [];

  public get(id: number): Promise<Entity> {
    return this.repository.findOneOrFail(id, {
      relations: this.relations,
    });
  }

  public getAll(options?: FindManyOptions): Promise<Entity[]> {
    let query: FindManyOptions = { relations: this.relations };

    if (options) {
      query = {
        ...query,
        skip: options.skip,
        take: options.take,
      };
    }

    return this.repository.find(query);
  }

  abstract createOrUpdate(
    fields: {},
    id?: number
  ): Promise<Entity>;

  public async delete(id: number | number[]): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}

export default ServiceAbstract;
