import {IRepositoryData} from '../github/index';
import {IOwner, IPullRequest} from './index';

export interface IRepo {
  readonly name: string;
  readonly owner: IOwner;

  asJson(): Promise<JSON>;
  asRepositoryData(): Promise<IRepositoryData>;
  getOpenPullRequests(): Promise<Array<IPullRequest>>;
  getPullRequest(pullRequestNumber: number): IPullRequest;

}
