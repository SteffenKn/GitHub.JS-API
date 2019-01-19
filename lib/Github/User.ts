import {HttpClient} from '../HttpClient';

import {Repo} from './Repo';

export class User {
  private _httpClient: HttpClient;
  private _username: string;

  constructor(httpClient, username) {
    this._httpClient = httpClient;
    this._username = username;
  }

  public getRepo(repoName): Repo {
    return new Repo(this._httpClient, this._username, repoName);
  }

  public get username(): string {
    return this._username;
  }

  public get repos(): Array<Repo> {
    throw new Error('Not Implemented!');
  }

  public get asJson(): Promise<JSON> {
    const url = `/user/${this._username}`;

    return this._httpClient.get(url);
  }
}
