import {IOrga, IUser} from './index';

export interface IGitHubApi {
  endpoint: string;
  authToken: string;

  getOrga(orgaName: string): IOrga;
  getUser(username: string): IUser;
}
