import {HttpClient, Owner, PullRequest} from '../index';

export class Repo {
  private _httpClient: HttpClient;

  private _owner: Owner;
  private _name: string;

  constructor(httpClient: HttpClient, owner: Owner, name: string) {
    this._httpClient = httpClient;

    this._owner = owner;
    this._name = name;
  }

  public static fromData(httpClient: HttpClient, owner: Owner, data: JSON): Repo {
    const repoName: string = data['name'];

    return new Repo(httpClient, owner, repoName);
  }

  private _getData(): Promise<JSON> {
    const url: string = `/repos/${this._owner.name}/${this._name}`;

    return this._httpClient.get(url);
  }

  public get name(): string {
    return this._name;
  }

  public get owner(): Owner {
    return this._owner;
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
