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
    const baseUrl: string = this._getBaseUrl();
    const url: string = `${baseUrl}/repos`;

    const response: JSON = await this._httpClient.get(url);

    const repos: Array<Repo> = [];

    for (const responseIndex in response) {
      const repoData: JSON = response[responseIndex];

      const repo: Repo = Repo.fromData(this._httpClient, this, repoData);

      repos.push(repo);
    }

    return repos;
  }

  public getRepo(repoName: string): Repo {
    return new Repo(this._httpClient, this, repoName);
  }

  protected abstract _getBaseUrl(): string;

  public get name(): string {
    return this._name;
  }

  public asJson(): Promise<JSON> {
    const url: string = this._getBaseUrl();

    return this._httpClient.get(url);
  }
}
