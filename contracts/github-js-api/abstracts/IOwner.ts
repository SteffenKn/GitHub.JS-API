import {IRepo} from '../index';

export interface IOwner {
  readonly name: string;

  getAllPublicRepos(): Promise<Array<IRepo>>;
  asJson(): Promise<JSON>;
  getRepo(repoName: string): IRepo;
}
