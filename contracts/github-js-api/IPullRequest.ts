import {IPullRequestData} from '../github/index';
import {IOwner, IRepo} from './index';

export interface IPullRequest {
  readonly owner: IOwner;
  readonly repo: IRepo;
  readonly number: number;

  asJson(): Promise<JSON>;
  asPullRequestData(): Promise<IPullRequestData>;
}
