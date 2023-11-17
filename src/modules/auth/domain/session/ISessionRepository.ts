import { UniqueEntityID } from '../../../../shared';

export interface ISessionRepository {
  create(id: UniqueEntityID): Promise<UniqueEntityID>;
}
