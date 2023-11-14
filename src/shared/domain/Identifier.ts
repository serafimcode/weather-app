import { v4, validate } from 'uuid';

export class UniqueEntityID {
  private _value: string;

  get value() {
    return this._value;
  }

  constructor(id?: string) {
    this._value = validate(id) ? id : v4();
  }

  equals(id: UniqueEntityID): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id._value === this._value;
  }
}
