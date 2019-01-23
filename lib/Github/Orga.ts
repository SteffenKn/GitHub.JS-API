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

  public _getUrl(): string {
    return `/orgs/${this._name}/repos`;
  }

  public asJson(): Promise<JSON> {
    const url: string = `/orgs/${this._name}`;

    return this._httpClient.get(url);
  }
}
