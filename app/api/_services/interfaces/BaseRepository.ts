export interface IBaseRepository<
   Entity extends { id: unknown },
   CreateDTO,
   UpdateDTO,
> {
   create(data: CreateDTO): Promise<Entity>;
   update(data: UpdateDTO): Promise<void>;
   findById(id: Entity['id']): Promise<Entity | null>;
   delete(id: Entity['id']): Promise<void>;
   findAll(): Promise<Entity[]>;
}
