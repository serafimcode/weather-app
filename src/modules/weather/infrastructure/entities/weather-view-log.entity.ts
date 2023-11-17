import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../../../auth/infrastructure';

@Entity('weather_view_logs')
export class WeatherViewLogEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'action_time', type: 'int8' })
  actionTime: number;

  @Column({ name: 'requested_result' })
  requestResult: number;

  @Column({
    name: 'temp_c',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  tempC: number;
}
