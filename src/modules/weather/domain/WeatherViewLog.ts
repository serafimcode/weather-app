import { Entity, UniqueEntityID } from '../../../shared';

export interface IWeatherViewLogProps {
  userId: UniqueEntityID;
  actionTime: number;
  requestResult: number;
  tempC: number;
}

export class WeatherViewLog extends Entity<IWeatherViewLogProps> {
  get userId(): UniqueEntityID {
    return this.props.userId;
  }

  get actionTime(): number {
    return this.props.actionTime;
  }

  get requestResult(): number {
    return this.props.requestResult;
  }

  get tempC(): number {
    return this.props.tempC;
  }

  private constructor(props: IWeatherViewLogProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(
    props: IWeatherViewLogProps,
    id?: UniqueEntityID,
  ): WeatherViewLog {
    return new WeatherViewLog(props, id);
  }
}
