import {ISubUserData} from '../index';

import {ISubRepositoryData} from './ISubRepositoryData';

export interface IBaseData {
  label: string;
  ref: string;
  sha: string;
  user: ISubUserData;
  repo: ISubRepositoryData;
}
