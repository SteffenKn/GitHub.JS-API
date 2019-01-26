import {HttpClient, Owner} from '../index';

export class User extends Owner {

  constructor(httpClient: HttpClient, name: string) {
    super(httpClient, name);
  }

  protected _getBaseUrl(): string {
    return `/users/${this._name}`;
  }
}
