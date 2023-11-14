import { ValueObject } from '../../../shared';

export interface IApiTokenProps {
  value: string;
}

export class ApiToken extends ValueObject<IApiTokenProps> {
  get value(): string {
    return this.props.value;
  }

  constructor(props: IApiTokenProps) {
    super(props);
  }

  static create(token: string): ApiToken {
    return new ApiToken({ value: token });
  }
}
