export interface Mapper<Domain, ReqDTO, ResDTO, Entity> {
  toDomain(e: Entity): Domain;
  toResponseDTO(d: Domain): ResDTO;
  toRequestDTO(d: Domain): ReqDTO;
  toPersistence(d: Domain): Entity;
}
