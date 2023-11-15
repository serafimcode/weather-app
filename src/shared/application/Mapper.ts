export interface Mapper<Domain, Entity> {
  toDomain(e: Entity): Domain;
  toPersistence(d: Domain): Entity;
}
