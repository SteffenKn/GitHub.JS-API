import {HttpClient} from '../HttpClient';

import {Owner} from './abstracts/Owner';

export class User extends Owner {

  constructor(httpClient: HttpClient, name: string) {
    super(httpClient, name);
  }

  protected _getBaseUrl(): string {
    return `/users/${this._name}`;
  }
}
