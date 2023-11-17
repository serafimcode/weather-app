import { ValueObject } from '../../../../shared';

export interface IPasswordProps {
  value: string;
}

export class Password extends ValueObject<IPasswordProps> {
  private static readonly MIN_LENGTH = 6;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: IPasswordProps) {
    super(props);
  }

  static isValid(password: string): boolean {
    const regExp = new RegExp('^(?=.*[.,!_]).{6,}$');

    if (!regExp.test(password)) {
      throw new Error(
        'Invalid password. Password have to contain one of this symbols: _!,.',
      );
    }
    if (password.length < this.MIN_LENGTH) {
      throw new Error('The password should have at least 6 symbols');
    }

    return true;
  }

  static create(pass: string): Password {
    return new Password({ value: pass });
  }
}
