import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('sessions')
export class SessionEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: string;
}
