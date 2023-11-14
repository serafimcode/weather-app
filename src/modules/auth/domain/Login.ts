import { ValueObject } from '../../../shared';

export interface ILoginProps {
  value: string;
}

export class Login extends ValueObject<ILoginProps> {
  private static readonly MIN_LENGTH = 6;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: ILoginProps) {
    super(props);
  }

  private static isValid(password: string): boolean {
    const regExp = new RegExp('^\\w{6,}$');
    return regExp.test(password);
  }

  private static isAppropriateLength(password: string): boolean {
    return password.length >= this.MIN_LENGTH;
  }

  static create(pass: string): Login {
    if (!this.isAppropriateLength(pass)) {
      throw new Error('The login should have at least 6 symbols');
    }
    if (!this.isValid(pass)) {
      throw new Error(
        'Invalid login. Password have to contain only latin characters, numbers and underscore(_)',
      );
    }
    return new Login({ value: pass });
  }
}
