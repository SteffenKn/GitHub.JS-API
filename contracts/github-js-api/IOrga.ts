import {IOwner} from './index';

import {IOrganizationData} from '../index';

export interface IOrga extends IOwner {

  asOrganization(): Promise<IOrganizationData>;
}
