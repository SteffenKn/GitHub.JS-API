import {IRepo} from '../index';

export interface IOwner {
  readonly name: string;

  getAllPublicRepos(): Promise<Array<IRepo>>;
  getRepo(repoName: string): IRepo;
  asJson(): Promise<JSON>;
}
