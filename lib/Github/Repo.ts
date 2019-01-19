import {HttpClient} from '../HttpClient';

export class Repo {
  private _httpClient: HttpClient;

  private _ownerName: string;
  private _repoName: string;

  constructor(httpClient, ownerName, repoName) {
    this._httpClient = httpClient;

    this._ownerName = ownerName;
    this._repoName = repoName;
  }

  public get asJson(): Promise<JSON> {
    const url = `/repos/${this._ownerName}/${this._repoName}`;

    return this._httpClient.get(url);
  }
}
