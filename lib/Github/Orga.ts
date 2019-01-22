import {HttpClient} from '../HttpClient';
import {Repo} from './Repo';

export class Orga {
  private _httpClient: HttpClient;
  private _orgaName: string;

  constructor(httpClient: HttpClient, orgaName: string) {
    this._httpClient = httpClient;
    this._orgaName = orgaName;
  }

  public getRepo(repoName: string): Repo {
    return new Repo(this._httpClient, this._orgaName, repoName);
  }

  public async getAllRepos(): Promise<Array<Repo>> {
    const url: string = `/orgas/${this._orgaName}/repos`;

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
    const url: string = `/orgs/${this._orgaName}`;

    return this._httpClient.get(url);
  }
}
