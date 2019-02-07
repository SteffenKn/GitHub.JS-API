import {IOwner, IPullRequest, IRepo} from '../../contracts/index';

import {
  ConfigService,
  HttpClient,
  Owner,
  Registry,
  Repo,
} from '../index';

export class PullRequest {
  private _configService: ConfigService;
  private _httpClient: HttpClient;

  private _owner: IOwner;
  private _repo: IRepo;
  private _number: number;

  constructor(owner: IOwner, repo: ORepo, pullRequestNumber: number, configService?: ConfigService) {
    const pullRequestNumberIsNoNumber: boolean = isNaN(parseInt(`${pullRequestNumber}`));
    if (pullRequestNumberIsNoNumber) {
      throw new Error('PullRequestNumber must be a number');
    }

    this._owner = owner;
    this._repo = repo;
    this._number = pullRequestNumber;

    const configServiceIsSet: boolean = configService !== undefined;

    this._configService = configServiceIsSet
                          ? configService
                          : Registry.getElement('ConfigService');

    this._httpClient = new HttpClient(this._configService);
  }

  public static fromData(owner: IOwner, repo: IRepo, data: JSON, configService?: ConfigService): IPullRequest {
    const pullRequestNumber: number = parseInt(data['number']);

    const pullRequest: IPullRequest = new PullRequest(owner, repo, pullRequestNumber, configService);

    return pullRequest;
  }

  public get number(): number {
    return this._number;
  }

  public get owner(): IOwner {
    return this._owner;
  }

  public get repo(): IRepo {
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

  private _getData(): Promise<JSON> {
    const url: string = `/repos/${this._owner.name}/${this._repo.name}/pulls/${this._number}`;

    return this._httpClient.get(url);
  }
}
