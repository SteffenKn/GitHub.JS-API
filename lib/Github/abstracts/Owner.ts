import {HttpClient} from '../../HttpClient';
import {Repo} from '../Repo';

const maxResultAmount: number = 100;

export abstract class Owner {
  protected _name: string;

  constructor(name: string) {
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
      const response: JSON = await HttpClient.get(url);

      for (const responseIndex in response) {
        const repoData: JSON = response[responseIndex];

        const repo: Repo = Repo.fromData(this, repoData);

        repos.push(repo);
      }
    }

    return repos;
  }

  public getRepo(repoName: string): Repo {
    return new Repo(this, repoName);
  }

  public get name(): string {
    return this._name;
  }

  public async asJson(): Promise<JSON> {
    const data: JSON = await this._getData();

    const errorGettingData: boolean = data['message'] !== undefined;

    if (errorGettingData) {
      throw new Error(data['message']);
    }

    return data;
  }

  protected abstract _getBaseUrl(): string;

  private _getData(): Promise<JSON> {
    const url: string = this._getBaseUrl();

    return HttpClient.get(url);
  }
}
