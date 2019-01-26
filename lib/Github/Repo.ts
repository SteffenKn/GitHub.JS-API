import {HttpClient} from '../HttpClient';
import {Owner} from './abstracts/Owner';

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
    const data: JSON = await this.getData();

    const hasMessage: boolean = data['message'] !== undefined;

    if (hasMessage) {
      throw new Error(data['message']);
    }

    return this.getData();
  }
}
