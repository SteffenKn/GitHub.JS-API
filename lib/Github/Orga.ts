import {HttpClient} from '../HttpClient';
import {Repo} from './Repo';

export class Orga {
  private _httpClient: HttpClient;
  private _name: string;

  constructor(httpClient: HttpClient, name: string) {
    this._httpClient = httpClient;
    this._name = name;
  }

  public getRepo(repoName: string): Repo {
    return new Repo(this._httpClient, this._name, repoName);
  }

  public asJson(): Promise<JSON> {
    const url: string = `/orgs/${this._name}`;

    return this._httpClient.get(url);
  }
}
