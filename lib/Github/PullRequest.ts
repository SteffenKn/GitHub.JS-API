import {HttpClient, Owner, Repo} from '../index';

export class PullRequest {
  private _owner: Owner;
  private _repo: Repo;
  private _number: number;

  constructor(owner: Owner, repo: Repo, pullRequestNumber: number) {

    const pullRequestNumberIsNoNumber: boolean = isNaN(parseInt(`${pullRequestNumber}`));
    if (pullRequestNumberIsNoNumber) {
      throw new Error('PullRequestNumber must be a number');
    }

    this._owner = owner;
    this._repo = repo;
    this._number = pullRequestNumber;
  }

  public static fromData(owner: Owner, repo: Repo, data: JSON): PullRequest {
    const pullRequestNumber: number = parseInt(data['number']);

    return new PullRequest(owner, repo, pullRequestNumber);
  }

  private _getData(): Promise<JSON> {
    const url: string = `/repos/${this._owner.name}/${this._repo.name}/pulls/${this._number}`;

    return HttpClient.get(url);
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
