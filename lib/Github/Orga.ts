import {HttpClient} from '../HttpClient';

import {Owner} from './abstracts/Owner';

export class Orga extends Owner {
  constructor(httpClient: HttpClient, name: string) {
    super(httpClient, name);
  }

  public _getBaseUrl(): string {
    return `/orgs/${this._name}`;
  }
}
