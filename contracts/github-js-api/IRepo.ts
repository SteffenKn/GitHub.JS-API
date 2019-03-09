import {IOwner, IPullRequest} from './index';

export interface IRepo {
  readonly name: string;
  readonly owner: IOwner;

  getOpenPullRequests(): Promise<Array<IPullRequest>>;
  getPullRequest(pullRequestNumber: number): IPullRequest;
  asJson(): Promise<JSON>;

}
