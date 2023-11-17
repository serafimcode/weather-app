import { ValueObject } from '../../../../shared';

export interface FioProps {
  value: string;
}

export class Fio extends ValueObject<FioProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: FioProps) {
    super(props);
  }

  static create(fio: string): Fio {
    if (!this.isValid(fio)) {
      throw new Error('Invalid FIO');
    }
    return new Fio({ value: fio });
  }

  private static isValid(fio: string): boolean {
    const regExp = new RegExp(
      '^([А-ЯЁ][а-яё]+([-][А-ЯЁ][а-яё]+)?\\s){2}[А-ЯЁ][а-яё]+?$',
    );
    return regExp.test(fio);
  }
}
