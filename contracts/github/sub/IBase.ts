import {ISubUser} from '../index';

import {ISubRepo} from './ISubRepo';

export interface IBase {
  label: string;
  ref: string;
  sha: string;
  user: ISubUser;
  repo: ISubRepo;
}
