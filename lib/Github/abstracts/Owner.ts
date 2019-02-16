import {ConfigService, HttpClient, Registry} from '../../index';

import {Repo} from '../Repo';

const maxResultAmount: number = 100;

export abstract class Owner {

  protected _name: string;

  protected _configService: ConfigService;
  protected _httpClient: HttpClient;

  constructor(name: string, configService?: ConfigService) {
    this._name = name;

    const configServiceIsSet: boolean = configService !== undefined;

    this._configService = configServiceIsSet
                          ? configService
                          : Registry.getElement('ConfigService');

    this._httpClient = new HttpClient(this._configService);
  }

  public async getAllPublicRepos(configService?: ConfigService): Promise<Array<Repo>> {
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

        const repo: Repo = Repo.fromData(this, repoData, configService);

        repos.push(repo);
      }
    }

    return repos;
  }

  public getRepo(repoName: string, configService?: ConfigService): Repo {
    return new Repo(this, repoName, configService);
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

    return this._httpClient.get(url);
  }
}
