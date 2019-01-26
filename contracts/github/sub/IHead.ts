import {ISubUser} from '../index';

import {ISubRepo} from './index';

export interface IHead {
  label: string;
  ref: string;
  sha: string;
  user: ISubUser;
  repo: ISubRepo;
}
