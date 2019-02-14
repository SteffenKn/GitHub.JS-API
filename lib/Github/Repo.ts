import {
  ConfigService,
  HttpClient,
  Owner,
  PullRequest,
  Registry,
} from '../index';

export class Repo {
  private _configService: ConfigService;
  private _httpClient: HttpClient;

  private _owner: Owner;
  private _name: string;

  constructor(owner: Owner, name: string, configService?: ConfigService) {
    this._owner = owner;
    this._name = name;

    const configServiceIsSet: boolean = configService !== undefined;

    this._configService = configServiceIsSet
                          ? configService
                          : Registry.getElement('ConfigService');

    this._httpClient = new HttpClient(this._configService);
  }

  public static fromData(owner: Owner, data: JSON, configService?: ConfigService): Repo {
    const repoName: string = data['name'];

    return new Repo(owner, repoName, configService);
  }

  public async getOpenPullRequests(configService?: ConfigService): Promise<Array<PullRequest>> {
    const pullRequests: Array<PullRequest> = [];

    let pullRequestsFound: boolean = true;
    let pageIndex: number = 1;

    while (pullRequestsFound) {
      const url: string = `/repos/${this._owner.name}/${this.name}/pulls?per_page=100&page=${pageIndex}`;
      const response: JSON = await this._httpClient.get(url);

      for (const responseIndex in response) {
        const pullRequestData: JSON = response[responseIndex];

        const pullRequest: PullRequest = PullRequest.fromData(this._owner, this, pullRequestData, configService);

        pullRequests.push(pullRequest);
      }

      pullRequestsFound = Object.keys(response).length > 0;
      pageIndex++;
    }

    return pullRequests;
  }

  public getPullRequest(pullRequestNumber: number, configService?: ConfigService): PullRequest {
    return new PullRequest(this._owner, this, pullRequestNumber, configService);
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
