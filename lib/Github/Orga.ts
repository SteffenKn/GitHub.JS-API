import {Repo} from './Repo';
import {HttpClient} from '../HttpClient';

export class Orga {
  private _httpClient: HttpClient;
  private _orgaName: string;

  constructor(httpClient, orgaName) {
    this._httpClient = httpClient;
    this._orgaName = orgaName;
  }

  public getRepo(repoName): Repo {
    return new Repo(this._httpClient, this._orgaName, repoName);
  }

  public get repos(): Array<Repo> {
    throw new Error('Not Implemented!');
  }

  public get data(): Promise<JSON> {
    const url = `/orgs/${this._orgaName}`;

    return this._httpClient.get(url);
  }
}
