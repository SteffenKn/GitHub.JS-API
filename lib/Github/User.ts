import {HttpClient} from '../HttpClient';

import {Owner} from './abstracts/Owner';
import {Repo} from './Repo';

export class User extends Owner {

  constructor(httpClient: HttpClient, name: string) {
    super(httpClient, name);
  }

  public getRepo(repoName: string): Repo {
    return new Repo(this._httpClient, this, repoName);
  }

  protected _getBaseUrl(): string {
    return `/users/${this._name}`;
  }
}
