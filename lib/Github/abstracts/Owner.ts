import {HttpClient} from '../../HttpClient';
import {Repo} from '../Repo';

export abstract class Owner {
  protected _httpClient: HttpClient;
  protected _name: string;

  constructor(httpClient: HttpClient, name: string) {
    this._httpClient = httpClient;
    this._name = name;
  }

  public async getAllRepos(): Promise<Array<Repo>> {
    const url: string = this._getUrl();

    const response: JSON = await this._httpClient.get(url);

    const repos: Array<Repo> = [];

    for (const responseIndex in response) {
      const repoData: JSON = response[responseIndex];

      const repo: Repo = Repo.fromData(this._httpClient, this, repoData);

      repos.push(repo);
    }

    return repos;
  }

  protected abstract _getUrl(): string;

  public get name(): string {
    return this._name;
  }
}
