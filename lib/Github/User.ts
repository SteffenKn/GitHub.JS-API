import {Owner} from './index';

export class User extends Owner {

  constructor(name: string) {
    super(name);
  }

  protected _getBaseUrl(): string {
    return `/users/${this._name}`;
  }
}
