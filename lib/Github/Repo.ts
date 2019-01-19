import {HttpClient} from '../HttpClient';

export class Repo {
  private _httpClient: HttpClient;

  private _ownerName: string;
  private _repoName: string;
  private _data: Promise<JSON>;

  constructor(httpClient: HttpClient, ownerName: string, repoName: string, data?: JSON) {
    this._httpClient = httpClient;

    this._ownerName = ownerName;
    this._repoName = repoName;

    const noData: boolean = data === undefined;
    if(noData) {
      this._data = this.getData();
    } else {
      this._data = new Promise((resolve) => {
        resolve(data);
      });
    }
  }

  public static fromData(httpClient: HttpClient, data: JSON) {
    const owner: JSON = data['owner'];

    const repoName: string = data['name'];
    const ownerName: string = owner['login'];

    return new Repo(httpClient, repoName, ownerName, data);
  }

  public getData(): Promise<JSON> {
    const url = `/repos/${this._ownerName}/${this._repoName}`;

    return this._httpClient.get(url);
  }

  public asJson(): Promise<JSON> {
    return this._data;
  }
}
