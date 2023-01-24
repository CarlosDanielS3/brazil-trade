export interface IGenericRepository<TEntity, TEntityInsert, TEntityUpdate> {
  insert(repository: TEntityInsert): Promise<TEntity>;
  findAll(): Promise<TEntity[]>;
  findAllByAnyField(fields: {
    [key: string]: string | boolean | number | Date;
  }): Promise<TEntity[]>;
  findOneByAnyField(fields: {
    [key: string]: string | boolean | number | Date;
  }): Promise<TEntity>;
  update(id: number, data: TEntityUpdate): Promise<void>;
  deleteById(id: number): Promise<void>;
}
