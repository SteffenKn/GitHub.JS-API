import {IOwner} from './index';

import {IOrganizationData} from '../index';

export interface IOrga extends IOwner {

  asOrganizationData(): Promise<IOrganizationData>;
}
