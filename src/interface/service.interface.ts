import { DeleteResult, FindManyOptions } from "typeorm";

interface IService<Entity> {
  get(id: number): Promise<Entity>;
  getAll(options?: FindManyOptions): Promise<Entity[]>;
  createOrUpdate(fields: {}, userId?: number): Promise<Entity>;
  delete(userId: number | number[]): Promise<DeleteResult>;
}

export default IService;
