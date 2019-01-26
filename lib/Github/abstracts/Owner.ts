import {HttpClient} from '../../HttpClient';
import {Repo} from '../Repo';

const maxResultAmount: number = 100;

export abstract class Owner {
  protected _httpClient: HttpClient;
  protected _name: string;

  constructor(httpClient: HttpClient, name: string) {
    this._httpClient = httpClient;
    this._name = name;
  }

  public async getAllPublicRepos(): Promise<Array<Repo>> {
    const baseUrl: string = this._getBaseUrl();

    const ownerData: JSON = await this.asJson();
    const publicRepoAmount: number = ownerData['public_repos'];
    const requestAmount: number = Math.ceil(publicRepoAmount / maxResultAmount);

    const repos: Array<Repo> = [];

    for (let index: number = 1; index <= requestAmount; index++) {
      const url: string = `${baseUrl}/repos?per_page=100&page=${index}`;
      const response: JSON = await this._httpClient.get(url);

      for (const responseIndex in response) {
        const repoData: JSON = response[responseIndex];

        const repo: Repo = Repo.fromData(this._httpClient, this, repoData);

        repos.push(repo);
      }
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

  private _getData(): Promise<JSON> {
    const url: string = this._getBaseUrl();

    return this._httpClient.get(url);
  }

  public async asJson(): Promise<JSON> {
    const data: JSON = await this._getData();

    const errorGettingData: boolean = data['message'] !== undefined;

    if (errorGettingData) {
      throw new Error(data['message']);
    }

    return data;
  }
}
