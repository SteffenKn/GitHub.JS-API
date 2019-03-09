import {GitHubApi} from '../../GitHub';
import {IOrga, IUser} from './index';

export interface IGitHubApi {
  endpoint: string;
  authToken: string;

  getLoggedInUser(): Promise<IUser>;
  getOrga(orgaName: string): IOrga;
  getUser(username: string): IUser;
  withAuthToken(authToken: string): GitHubApi;
}
