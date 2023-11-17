import { Injectable } from '@nestjs/common';
import { ISessionRepository } from '../../domain';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from '../../infrastructure/entities/session.entity';
import { Repository } from 'typeorm';
import { UniqueEntityID } from '../../../../shared';

export const SESSION_REPOSITORY_INJECTOR = 'SESSION_REPOSITORY_INJECTOR';

@Injectable()
export class SessionRepositoryService implements ISessionRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionEntity: Repository<SessionEntity>,
  ) {}

  async create(userId: UniqueEntityID): Promise<UniqueEntityID> {
    const id = new UniqueEntityID();

    await this.sessionEntity.save({ id: id.value, userId: userId.value });

    return id;
  }
}
