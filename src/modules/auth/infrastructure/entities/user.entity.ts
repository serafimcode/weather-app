import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  fio: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ name: 'api_token' })
  apiToken: string;
}
