import {HttpClient, Owner, Repo} from '../index';

export class PullRequest {
  private _httpClient: HttpClient;

  private _owner: Owner;
  private _repo: Repo;
  private _number: number;

  constructor(httpClient: HttpClient, owner: Owner, repo: Repo, pullRequestNumber: number) {
    this._httpClient = httpClient;

    this._owner = owner;
    this._repo = repo;
    this._number = pullRequestNumber;
  }

  public static fromData(httpClient: HttpClient, owner: Owner, repo: Repo, data: JSON): PullRequest {
    const pullRequestNumber: number = data['number'];

    return new PullRequest(httpClient, owner, repo, pullRequestNumber);
  }

  private _getData(): Promise<JSON> {
    const url: string = `/repos/${this._owner.name}/${this._repo.name}/pulls/${this._number}`;

    return this._httpClient.get(url);
  }

  public get number(): number {
    return this._number;
  }

  public get owner(): Owner {
    return this._owner;
  }

  public get repo(): Repo {
    return this._repo;
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
