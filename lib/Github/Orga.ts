import {HttpClient} from '../HttpClient';

import {Owner} from './abstracts/Owner';

import {Repo} from './Repo';

export class Orga extends Owner {
  constructor(httpClient: HttpClient, name: string) {
    super(httpClient, name);
  }

  public getRepo(repoName: string): Repo {
    return new Repo(this._httpClient, this, repoName);
  }

  public _getBaseUrl(): string {
    return `/orgs/${this._name}`;
  }
}
