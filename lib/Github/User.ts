import {HttpClient} from '../HttpClient';

import {Repo} from './Repo';

export class User {
  private _httpClient: HttpClient;
  private _username: string;

  constructor(httpClient: HttpClient, username: string) {
    this._httpClient = httpClient;
    this._username = username;
  }

  public getRepo(repoName: string): Repo {
    return new Repo(this._httpClient, this._username, repoName);
  }

  public get username(): string {
    return this._username;
  }

  public async getAllRepos(): Promise<Array<Repo>> {
    const url: string = `/users/${this._username}/repos`;

    const response: JSON = await this._httpClient.get(url);

    const repos: Array<Repo> = [];

    for (const responseIndex in response) {
      const repoData: JSON = response[responseIndex];

      const repo: Repo = Repo.fromData(this._httpClient, repoData);

      repos.push(repo);
    }

    return repos;
  }

  public asJson(): Promise<JSON> {
    const url: string = `/user/${this._username}`;

    return this._httpClient.get(url);
  }
}
