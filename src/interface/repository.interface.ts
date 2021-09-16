import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  QueryRunner,
  SaveOptions,
  SelectQueryBuilder,
} from "typeorm";

interface IRepository<Entity> {
  create(): Entity;

  save(entity: DeepPartial<Entity>, options?: SaveOptions): Promise<Entity>;

  save(entity: DeepPartial<Entity>, options?: SaveOptions): Promise<Entity[]>;

  save(
    entity: DeepPartial<Entity>,
    options?: SaveOptions
  ): Promise<Entity | Entity[]>;

  delete(ids: number | number[]): Promise<DeleteResult>;

  find(options?: FindManyOptions<Entity>): Promise<Entity[]>;

  findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>
  ): Promise<Entity>;

  findOneOrFail(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>
  ): Promise<Entity>;

  createQuery(
    alias?: string,
    queryRunner?: QueryRunner
  ): SelectQueryBuilder<Entity>;
}

export default IRepository;
