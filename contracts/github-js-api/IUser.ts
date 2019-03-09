import {IUserData} from '../github/index';
import {IOwner} from './index';

// tslint:disable-next-line
export interface IUser extends IOwner {
  asUserData(): Promise<IUserData>;
}
