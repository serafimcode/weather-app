import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { WeatherViewLogEntity } from '../../../weather/infrastructure';
import { SessionEntity } from './session.entity';

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

  @OneToMany(() => WeatherViewLogEntity, (weatherLog) => weatherLog.id)
  @Column({ name: 'api_token' })
  apiToken: WeatherViewLogEntity[];

  @OneToMany(() => SessionEntity, (session) => session.id)
  @Column({ name: 'session_id', nullable: true })
  sessionId: SessionEntity[];
}
