import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  QueryRunner,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
} from "typeorm";

import { injectable } from "inversify";

@injectable()
abstract class RepositoryAbstract<Entity> {
  protected repository: Repository<Entity>;

  public create(): Entity {
    return this.repository.create();
  }

  public save(
    entity: DeepPartial<Entity>,
    options?: SaveOptions
  ): Promise<Entity>;

  public save(
    entity: DeepPartial<Entity>,
    options?: SaveOptions
  ): Promise<Entity[]>;

  public save(
    entity: DeepPartial<Entity>,
    options?: SaveOptions
  ): Promise<Entity | Entity[]> {
    return this.repository.save(entity, options);
  }

  public delete(ids: number | number[]): Promise<DeleteResult> {
    return this.repository.delete(ids);
  }

  public find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(options);
  }

  public findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>
  ): Promise<Entity> {
    return this.repository.findOne(id, options);
  }

  public findOneOrFail(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>
  ): Promise<Entity> {
    return this.repository.findOneOrFail(id, options);
  }

  public createQuery(
    alias?: string,
    queryRunner?: QueryRunner
  ): SelectQueryBuilder<Entity> {
    return this.repository.createQueryBuilder(alias, queryRunner);
  }
}

export default RepositoryAbstract;
