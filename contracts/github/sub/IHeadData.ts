import {ISubUserData} from '../index';

import {ISubRepositoryData} from './index';

export interface IHeadData {
  label: string;
  ref: string;
  sha: string;
  user: ISubUserData;
  repo: ISubRepositoryData;
}
