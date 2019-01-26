import {HttpClient} from '../HttpClient';
import {Owner} from './abstracts/Owner';

export class Repo {
  private _httpClient: HttpClient;

  private _owner: Owner;
  private _name: string;
  private _data: Promise<JSON>;

  constructor(httpClient: HttpClient, owner: Owner, name: string, data?: JSON) {
    this._httpClient = httpClient;

    this._owner = owner;
    this._name = name;

    const noData: boolean = data === undefined;
    if (noData) {
      this._data = this.getData();
    } else {
      this._data = new Promise((resolve: Function): void => {
        resolve(data);

        return;
      });
    }
  }

  public static fromData(httpClient: HttpClient, owner: Owner, data: JSON): Repo {
    const repoName: string = data['name'];

    return new Repo(httpClient, owner, repoName, data);
  }

  public getData(): Promise<JSON> {
    const url: string = `/repos/${this._owner.name}/${this._name}`;

    return this._httpClient.get(url);
  }

  public get ownerName(): string {
    return this._owner.name;
  }

  public get name(): string {
    return this._name;
  }

  public get owner(): Owner {
    return this._owner;
  }

  public async asJson(): Promise<JSON> {
    const data: JSON = await this._data;

    const hasMessage: boolean = data['message'] !== undefined;

    if (hasMessage) {
      throw new Error(data['message']);
    }

    return this._data;
  }
}
